import FormData from 'form-data';

export const formDataFromMulterFiles = (files: Express.Multer.File[], fieldName: string): FormData => {
  const data = new FormData();
  for (let file of files) {
    data.append(fieldName, file.buffer, { filename: file.originalname, contentType: file.mimetype });
  }
  return data;
};
