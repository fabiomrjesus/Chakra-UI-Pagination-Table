import { BoxProps, InputProps, StackProps, TableProps } from "@chakra-ui/react";
import React, { ReactNode } from "react";

export interface PaginationTableColumn
{
    header?:string;
    order?:"up"|"down"|undefined;
    accessor:string;
    dataType:"number"|"text"|"date"|undefined
    sorted?:boolean
    Wrapper?:(props:any) => JSX.Element
}

export interface PaginationTableProps extends TableProps
{
    name?:string,
    data:any[],
    noData?:string,
    columns?:PaginationTableColumn[],
    itemsPerPageOptions?:number[]
}

export interface SearchInputProps extends InputProps
{
    value:string
    setValue:(a:string)=>void
}

export interface ItemsPerPageSelectionProps extends BoxProps
{
    itemsPerPageOptions:number[]|undefined
    setItemsPerPage:(a:number|undefined)=>void
}

export interface PaginationProps extends StackProps
{
    pages:number
    page:number
    setPage:(a:number)=>void
}