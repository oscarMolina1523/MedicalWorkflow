import { inject, injectable } from "tsyringe";
import KPI from "../../Domain.Endpoint/entities/kpi.model";
import { IKpiRepository } from "../../Domain.Endpoint/interfaces/repositories/kpiRepository.interface";
import { IKpiService } from "../interfaces/kpiService.interface";

@injectable()
export default class KpiService implements IKpiService {
  private readonly _kpiRepository: IKpiRepository;

  constructor(@inject("IKpiRepository") kpiRepository: IKpiRepository) {
    this._kpiRepository = kpiRepository;
  }

  async getKpis(): Promise<KPI[]> {
    return await this._kpiRepository.getAll();
  }
}
