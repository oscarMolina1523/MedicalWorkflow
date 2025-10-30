import KPI from "../../Domain.Endpoint/entities/kpi.model";

export interface IKpiService{
    getKpis(): Promise<KPI[]>;
}