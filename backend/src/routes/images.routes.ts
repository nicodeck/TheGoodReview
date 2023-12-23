import express, { Request, Response } from "express";
import { igdb_api_request } from "../utils/igdb_request.utils";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.send("image route");
});

router.get("/cover", async (req: Request, res: Response) => {
  if (!req.query.id) {
    res.status(400).send("Error: missing required query parameter: id.");
  }
  const coverSize = req.query.size ? req.query.size : "cover_big";

  const imageInfo = await igdb_api_request(
    "/covers",
    `fields image_id; where id=${req.query.id};`
  );

  const imageId = imageInfo[0].image_id;

  res.send(
    `https://images.igdb.com/igdb/image/upload/t_${coverSize}/${imageId}.jpg`
  );
});

export default router;
