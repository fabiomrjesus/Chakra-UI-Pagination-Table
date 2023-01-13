import { ChevronDownIcon } from "@chakra-ui/icons";
import { Box, Input, Menu, MenuButton, Button, MenuList, MenuItem, TableCellProps, Text, Th, VStack, HStack, Spacer, Table, Thead, Tr, Tfoot, Center, Tbody, Td, InputGroup, InputLeftAddon } from "@chakra-ui/react";
import { useState } from "react";
import { FaSortNumericDown, FaSortNumericUp, FaSortAlphaDown, FaSortAlphaUp, FaSortUp, FaSearch } from "react-icons/fa";
import { SearchInputProps, PaginationTableProps, PaginationTableColumn, ItemsPerPageSelectionProps, PaginationProps } from "./chakra-ui-pagination-table.model";
import { filterItems, getPages, paginate, range, sortItems } from "./chakra-ui-pagination-table.scripts";

function SearchInput({value, setValue, ...props}:SearchInputProps)
{
    return <InputGroup>
        <InputLeftAddon><FaSearch/></InputLeftAddon>
        <Input className="filter-input" type="text" value={value} onChange={(e)=>setValue(e.target.value)} {...props} />
    </InputGroup>
}

function ItemsPerPageSelection({itemsPerPageOptions, setItemsPerPage, ...props}:ItemsPerPageSelectionProps)
{
    const [current, setCurrent] = useState("Select");

    return <Box><Menu className="items-per-page-wrapper" {...props}>
        <MenuButton className="items-per-page-button" disabled={!itemsPerPageOptions} as={Button} rightIcon={<ChevronDownIcon />}>{current}</MenuButton>
        {itemsPerPageOptions && <MenuList>
            <MenuItem className="items-per-page-item" key={"items_per_page_selection_all"} onClick={()=>{setCurrent("Select"); setItemsPerPage(undefined)}}>All</MenuItem>
            {itemsPerPageOptions.map((ipp, idx) =>{
                return <MenuItem className="items-per-page-item" key={"items_per_page_selection"+idx} onClick={()=>{setCurrent(ipp.toString()); setItemsPerPage(ipp)}}>{ipp}</MenuItem>
            })}
        </MenuList>}    
    </Menu></Box>
}

function Pagination({page, pages, setPage, ...props}:PaginationProps)
{
    const pageList = range(1, pages);
    const selectedColor="dodge-blue";
    return <HStack className="pagination-wrapper" {...props}>
            {pageList.map(p=>{
                return <Button className="pagination-item" key={"page-"+p} bg={p === page ? selectedColor : "initial"} onClick={()=>setPage(p)}>{p}</Button>
            })}
        </HStack>
    
}


export default function PaginationTable({data, columns, name, noData, itemsPerPageOptions, ...props}:PaginationTableProps)
{
    const [filter, setFilter] = useState("");
    const [tableColumns, setTableColumns] = useState<PaginationTableColumn[]>(columns||generateColumnsFromData(data));
    const [page, setPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState<number|undefined>()
    const [pages, setPages] = useState(1);

    function getDataType(value:any):"number"|"text"|"date"|undefined
    {
        return (value instanceof HTMLElement)? undefined:
               (!isNaN(parseFloat(value)))? "number": 
                Date.parse(value) !== undefined ? "date":"text";
    }

    function generateColumnsFromData(items:any[]):PaginationTableColumn[]
    {
        let result:PaginationTableColumn[] = [];
        if(items.length !== 0)
        {
            const item = items[0]
            const keys = Object.keys(item);
            if(keys.length !== 0)
            {
                keys.forEach((k)=>{
                    result.push({
                        header:k,
                        accessor:k,
                        dataType:getDataType(item[k]),
                        order:"down"
                    });
                })
            }
        }
        return result;
    }

    function getOrderIcon(dataType:"number"|"date"|"text", order:"up"|"down")
    {
        return dataType === "number"? (order==="up"?<FaSortNumericDown/>:<FaSortNumericUp/>) :
               dataType === "text" ? (order==="up"?<FaSortAlphaDown/>:<FaSortAlphaUp/>) :
               <FaSortUp/> 
    }

    function setPagination(items:any[], itemsPerPage:number|undefined)
    {
        if(itemsPerPage)
        {
            setItemsPerPage(itemsPerPage)
            setPages(getPages(items, itemsPerPage))
        }
        else
        {
            setItemsPerPage(undefined);
            setPages(1);
        }
        setPage(1);
    }


    function updateColumnOrder(accessor:string)
    {
        let newColumns:PaginationTableColumn[] = [];
        tableColumns.forEach((c)=>{
            c.sorted = false;
            if(c.accessor === accessor)
            {
                c.order = c.order === "up"? "down":"up";
                c.sorted = true;
            } 
            else c.order = "down";
            newColumns.push(c);
        })
        setTableColumns([...newColumns]);
    }
    const rows =filterItems(data, tableColumns, filter);
    return <VStack w="100%" className={name+"-wrapper"}>
        <HStack w="100%" className={"filter-wrapper"}>
            <SearchInput w="20%" className={"filter-input"} setValue={setFilter} value={filter}/>
            <Spacer/>
            <ItemsPerPageSelection className={"items-per-page-selector"} itemsPerPageOptions={itemsPerPageOptions} setItemsPerPage={(n)=>setPagination(data, n)}  />
        </HStack>

        {(data && data.length > 0)?
        <Table className="table" {...props}>
            <Thead className="table-header">
                <Tr className="table-header-row">
                    {tableColumns.map((h, idx)=>{
                        return (<Th className="table-column-header" key={name+"_h_"+idx} onClick={h.dataType ? ()=>{updateColumnOrder(h.accessor)}:undefined}>
                            <HStack w="100%">
                                <Text>{h.header}</Text>
                                {h.dataType && <Button as="span">{getOrderIcon(h.dataType, h.order || "down")}</Button>}
                            </HStack>
                        </Th>)
                    })}
                </Tr>
            </Thead>
            <Tbody className="table-body">
                {paginate(sortItems(rows, tableColumns.find(x => x.sorted)), itemsPerPage)[page-1].map((item, ridx)=>{
                   return (<Tr className="table-body-row" key={name+"row_"+ridx}>
                    {tableColumns.map(({accessor, Wrapper}, cidx)=>{
                        return (<Td className="table-body-cell" key={name+"cell_"+ridx+"_"+cidx}>
                                    {Wrapper ?

                                (<Wrapper children={item[accessor]} />):
                                item[accessor]
                            }
                        </Td>)
                    })}
                   </Tr>)
                })}
            </Tbody>
        </Table>
        : <Box w="100%">
            <Center>
            {noData || "No records found"}
            </Center>
            </Box>}
            <HStack w="100%">
                <Text>{rows.length} Items</Text>
                <Spacer/>
                <Pagination pages={pages} page={page} setPage={setPage}/>
            </HStack>
    </VStack>
}