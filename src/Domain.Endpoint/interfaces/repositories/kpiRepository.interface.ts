import KPI from "../../entities/kpi.model";

export interface IKpiRepository {
  getAll(): Promise<KPI[]>;
}
