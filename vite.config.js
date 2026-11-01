import { defineConfig } from 'vite'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

export default defineConfig(() => {
  const projectDir = fileURLToPath(new URL('.', import.meta.url))
  const keyFile = new URL('../test-api-key.txt', import.meta.url)

  let apiKey

  try {
    apiKey = readFileSync(keyFile, 'utf8').trim()
  } catch {
    throw new Error(
      '親フォルダのopenai-api-key.txtを読み込めませんでした。',
    )
  }

  if (!apiKey.startsWith('sk-') || /\s/.test(apiKey)) {
    throw new Error(
      'openai-api-key.txtには通常のAPIキーだけを1行で保存してください。',
    )
  }

  return {
    server: {
        host: '127.0.0.1',
        port: 5173,
        strictPort: true,
        fs: {
            strict: true,
            allow: [projectDir],
        },
    },

    plugins: [
      {
        name: 'local-voice-token',

        configureServer(server) {
          server.middlewares.use(async (req, res, next) => {
            const requestUrl = new URL(
              req.url ?? '/',
              'http://localhost:5173',
            )

            if (
              requestUrl.pathname !== '/api/token' &&
              requestUrl.pathname !== '/api/knowledge'
            ) {
              return next()
            }

            res.setHeader('Content-Type', 'application/json')
            res.setHeader('Cache-Control', 'no-store')

            const reply = (status, body) => {
              res.statusCode = status
              res.end(JSON.stringify(body))
            }

            if (req.method !== 'POST') {
              return reply(405, { error: 'POSTのみ利用できます。' })
            }

            const allowedOrigins = [
              'http://127.0.0.1:5173',
              'http://localhost:5173',
            ]

            const allowedHosts = ['127.0.0.1:5173', 'localhost:5173']

            if (
              !allowedHosts.includes(req.headers.host) ||
              req.headers['x-voice-app'] !== 'local-test' ||
              (req.headers.origin &&
                !allowedOrigins.includes(req.headers.origin))
            ) {
              return reply(403, { error: 'この画面からは利用できません。' })
            }

            if (requestUrl.pathname === '/api/knowledge') {
              const query = (requestUrl.searchParams.get('q') ?? '').trim()

              if (!query || query.length > 200) {
                return reply(400, { error: '検索語は1〜200文字にしてください。' })
              }

              try {
                const file = new URL('../knowledge.json', import.meta.url)
                const records = JSON.parse(readFileSync(file, 'utf8'))

                if (!Array.isArray(records)) {
                  throw new Error('知識ファイルの形式が違います。')
                }

                const terms = query
                  .normalize('NFKC')
                  .toLowerCase()
                  .split(/\s+/)

                const results = records
                  .filter((record) => {
                    const searchable = [
                      ...record.keywords,
                      record.text,
                    ].join(' ').normalize('NFKC').toLowerCase()

                    return terms.some((term) => searchable.includes(term))
                  })
                  .slice(0, 3)
                  .map((record) => ({
                    id: record.id,
                    text: record.text,
                  }))

                console.log('[知識検索]', query, '→', results.map((r) => r.id))

                return reply(200, { results })
              } catch {
                return reply(500, {
                  error: 'knowledge.jsonの読み込み・検索に失敗しました。',
                })
              }
            }


            try {
              const response = await fetch(
                'https://api.openai.com/v1/realtime/client_secrets',
                {
                  method: 'POST',
                  headers: {
                    Authorization: `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    session: {
                      type: 'realtime',
                      model: 'gpt-realtime-2.1',
                    },
                  }),
                  signal: AbortSignal.timeout(15000),
                },
              )

              if (!response.ok) {
                return reply(502, {
                  error: `一時キーの発行に失敗しました（OpenAI: ${response.status}）。`,
                })
              }

              const data = await response.json()

              if (typeof data.value !== 'string') {
                throw new Error('一時キーがありません。')
              }

              reply(200, { value: data.value })
            } catch {
              reply(502, {
                error: '一時キーを取得できませんでした。接続を再試行してください。',
              })
            }
          })
        },
      },
    ],
  }
})