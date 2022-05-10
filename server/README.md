# New project Node

### Init project

```bash
yarn init -y

```

### Install dependencies

```bash
yarn add @prisma/client bcrypt dotenv express express-async-errors jsonwebtoken multer reflect-metadata tsyringe && yarn add -D @swc/core @swc/jest @types/bcrypt @types/express @types/jest @types/jsonwebtoken @types/multer @types/node @types/uuid jest prisma ts-jest ts-node ts-node-dev tsconfig-paths typescript
```

### Init typescript

```bash
yarn tsc --init
```

- Update file `tsconfig.json`

  ```bash
  {
    "compilerOptions": {
      "target": "es5",
      "module": "commonjs",
      "rootDir": "./",
      "baseUrl": "./src",
      "esModuleInterop": true,
      "experimentalDecorators": true,
      "emitDecoratorMetadata": true,
      "skipLibCheck": true,
      "forceConsistentCasingInFileNames": true,
      "resolveJsonModule": true,

      "sourceMap": true,
      "outDir": "dist",
      "strict": true,
      "lib": ["esnext"],

      "paths": {
        "@modules/*": ["modules/*"],
        "@config/*": ["config/*"],
        "@shared/*": ["shared/*"],
        "@errors/*": ["errors/*"],
        "@utils/*": ["utils/*"]
      }
    }
  }
  ```

### Init Jest

```bash
yarn jest --init
```

- Create file `jest.setup.ts`

  ```ts
  import 'reflect-metadata';
  ```

- Update file `jest.config.ts`

  ```bash
  import { pathsToModuleNameMapper } from 'ts-jest';
  import { compilerOptions } from './tsconfig.json';

  export default {
    clearMocks: true,
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coverageProvider: 'v8',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/src/' }),
    transform: {
      '^.+\\.(t|j)sx?$': [
        '@swc/jest',
        {
          jsc: {
            parser: {
              syntax: 'typescript',
              tsx: false,
              decorators: true,
            },
            target: 'es2020',
            keepClassNames: true,
            transform: {
              legacyDecorator: true,
              decoratorMetadata: true,
            },
          },
          module: {
            type: 'es6',
            noInterop: false,
          },
        },
      ],
    },
  };
  ```

### Update file package.json

```bash
  "scripts": {
    "dev": "ts-node-dev -r tsconfig-paths/register --exit-child --inspect --transpile-only --ignore-watch node_modules --respawn src/infra/http/server.ts",
    "test": "jest"
  },
```

### Create file `src/infra/http/routes/index.ts`

```ts
import { Request, Response, Router } from 'express';

const router = Router();

router.get('/test', (request: Request, response: Response) => {
  return response.json('Route test is ok ⛱');
});

export { router };
```

### Create file `src/infra/http/middlewares/AppError.ts`

```ts
import { NextFunction, Request, Response } from 'express';

export class AppError {
  public readonly message: string;

  public readonly statusCode: number;

  public constructor(message: string, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }

  public static middleware = (
    err: Error,
    request: Request,
    response: Response,
    _: NextFunction
  ): Response => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: 'error',
        message: err.message,
      });
    }

    console.error(err);

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  };
}
```

### Create file `src/infra/http/server.ts`

```ts
import { app } from '@infra/http/app';

const port = '3333';

app.listen(port, () => console.log(`🐶 Server running in port ${port} 🐶`));
```
