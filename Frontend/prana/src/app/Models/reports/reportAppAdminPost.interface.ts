export interface ReportAppAdminPostInterface {
    start_date: string;
    end_date: string;
    doctor?: number,
    specialty?: number,
    branch?: number,
    payment_method?: number
}