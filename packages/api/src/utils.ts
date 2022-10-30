import { nanoid } from 'nanoid';

const genid = (length = 8) => nanoid(length);

export default genid;
