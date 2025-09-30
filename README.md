This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## AutoWebApp – Documentación del Proyecto

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

AutoWebApp es una aplicación web ficticia para la gestión de vehículos en una automotora. Es un proyecto full-stack desarrollado con TypeScript, React, Next.js, Tailwind CSS y MongoDB. Permite a usuarios autenticados crear, leer, actualizar y eliminar (CRUD) registros de autos; además ofrece filtros de búsqueda por marca y modelo, y convierte automáticamente imágenes JPG/PNG al formato WebP para optimizar su tamaño.


Tecnologías utilizadas

TypeScript: un superconjunto tipado de JavaScript que añade verificación de tipos en tiempo de compilación

React: una biblioteca de JavaScript para construir interfaces de usuario basadas en componentes
. React facilita crear vistas interactivas de forma declarativa; se encarga de renderizar eficientemente los componentes correctos cuando cambian los datos

Next.js: un framework de React que permite desarrollar aplicaciones web completas (incluyendo servidor y cliente) de manera integrada. Next.js facilita el renderizado del lado servidor y la creación de API routes internas. De hecho, “Next.js permite crear endpoints públicos para manejar peticiones HTTP y devolver cualquier tipo de contenido”
nextjs.org

Tailwind CSS: un framework CSS utility-first muy popular, que ofrece clases predefinidas para diseñar directamente en el HTML
tailwindcss.com
. Permite estilizar rápido la interfaz con clases como flex, pt-4, text-center, etc., haciendo que el código sea más predecible y sencillo de escalar
tailwindcss.com

MongoDB: una base de datos NoSQL orientada a documentos. En MongoDB los datos se almacenan como documentos JSON/BSON flexibles en colecciones. Tal como explica la documentación oficial, los “documents store data in field-value pairs” (se almacenan en pares campo-valor) y pueden incluir tipos variados como cadenas, números, fechas, arreglos u objetos
mongodb.com

JSON Web Tokens (JWT): estándar abierto para transmisión segura de datos entre cliente y servidor
keepcoding.io
. En AutoWebApp, JWT se usa para autenticación: al iniciar sesión, el servidor emite un token compacto (self-contained) que contiene datos del usuario firmados. 

Conversión de imágenes: se emplea en el backend una librería como Sharp para procesar imágenes. Sharp es un módulo de Node.js de alto rendimiento que convierte imágenes (JPG/PNG) a formatos más pequeños y amigables para la web, incluyendo WebP
. Esto reduce el tamaño de las imágenes hasta ~30% menos que JPEG sin perder calidad perceptible
