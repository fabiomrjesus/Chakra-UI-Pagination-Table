export interface ITableSortOptions
{
    acessor:string;
    type:"numerical"|"alphanumerical"|boolean|undefined|"date";
    direction:"up"|"down";
}