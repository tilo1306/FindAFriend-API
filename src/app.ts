import fastify from 'fastify'
import swagger from '@fastify/swagger'
import swaggerUi from '@fastify/swagger-ui'
import { SwaggerTheme } from 'swagger-themes'
import { SwaggerThemeNameEnum } from 'swagger-themes/build/enums/swagger-theme-name'

export const app = fastify({ logger: true })

app.register(swagger)
app.register(swaggerUi, {
  routePrefix: 'docs',
  theme: {
    css: [
      {
        filename: 'theme.css',
        content: new SwaggerTheme().getBuffer(SwaggerThemeNameEnum.DARK),
      },
    ],
  },
})
