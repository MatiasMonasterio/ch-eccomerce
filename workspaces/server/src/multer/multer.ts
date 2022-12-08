import multer from "multer";
import { ROOT_PATH } from "../config/app";

const upload = multer({
  storage: multer.diskStorage({
    destination: (_req, _file, cb) => {
      cb(null, `${ROOT_PATH}/public/uploads`);
    },
    filename: (_req, file, cb) => {
      cb(null, Date.now() + file.originalname);
    },
  }),
});

export default upload;
