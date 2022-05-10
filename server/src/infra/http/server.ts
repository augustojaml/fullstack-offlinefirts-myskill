import { app } from '@infra/http/app';

const port = '3333';

app.listen(port, () => console.log(`🐶 Server running in port ${port} 🐶`));
