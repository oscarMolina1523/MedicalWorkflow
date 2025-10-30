import { inject, injectable } from "tsyringe";
import { IKpiService } from "../../Aplication.Endpoint/interfaces/kpiService.interface";
import {Request, Response} from "express";

@injectable()
export default class KpiController {
  private readonly service: IKpiService;

  constructor(@inject("IKpiService") service: IKpiService) {
    this.service = service;
  }

  getKpis = async (req: Request, res: Response) => {
    try {
      const kpis = await this.service.getKpis();
      res.status(200).json({ success: true, data: kpis });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Failed to get kpis" });
    }
  };
}
