import 'reflect-metadata'; // If we end up using it, good to have.
import app from './app';
import { config } from './config';

const PORT = config.port;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
