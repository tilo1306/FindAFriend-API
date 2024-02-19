import fastify from 'fastify'
import swagger from '@fastify/swagger'
import swaggerUi from '@fastify/swagger-ui'
import { SwaggerTheme } from 'swagger-themes'
import { SwaggerThemeNameEnum } from 'swagger-themes/build/enums/swagger-theme-name'
import { orgsRoutes } from './routes/orgsRoutes.routes'
import { authenticateRoute } from './routes/authenticateRoutes.routes'
import { env } from './env'
import { ZodError } from 'zod'
import fastifyJwt from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'
import { usersRoutes } from './routes/usersRoutes.routes'
import { petsRoute } from './routes/petsRoutes.routes'

export const app = fastify({ logger: true })

app.register(swagger, {
  swagger: {
    info: {
      title: 'FindAFriend API',
      description: 'Desafio Rocketseat',
      version: '0.1.0',
      components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    },
  },
})

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10m',
  },
})

app.register(fastifyCookie)

app.register(orgsRoutes)
app.register(authenticateRoute)
app.register(usersRoutes)
app.register(petsRoute)

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

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO: Here we should log to a external tool like DataDog/NewRelic/Sentry
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})
