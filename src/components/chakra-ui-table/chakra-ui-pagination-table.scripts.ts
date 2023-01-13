import { PaginationTableColumn } from "./chakra-ui-pagination-table.model";


/**
 * Returns an array of numbers that represents a range between two numbers
 * @param min the minimum number (included)
 * @param max the maximum number (included)
 * @returns an array of numbers
 */
export function range(min:number, max:number):number[]
{
    if(min > max) return [];
    let rng:number[] = [];
    for(let counter = min;counter <= max; counter++)
    {
        rng.push(counter);
    }
    return rng;
}

/**
 * Filters a list of items
 * @param items the list of items to filter
 * @param columns the columns that represent those items
 * @param filter the filter applied to the items
 * @returns a list of filtered items
 */
export function filterItems(items:any[], columns:PaginationTableColumn[], filter:string):any[]
{
    function itemMatches(item:any, columns:PaginationTableColumn[], filter:string):boolean
    {
        let isMatch = false;
        columns.forEach((x)=>{
            if(item[x.accessor].toString().includes(filter))
            {
                isMatch = true;
                return;
            }
        })
        return isMatch;
    }
    var result = items.filter(x => {
        const res = itemMatches(x, columns, filter)
        return res;
    });
    return result;
}
 
/**
 * 
 * @param item the object that has a property
 * @param columnToSort the column that describes the property
 * @returns the property's value with the correct typing or a default value
 */
function getValueWithType(item:any, columnToSort:PaginationTableColumn):any
{
    const value = item[columnToSort.accessor];
    if(!value) return value;
    if(columnToSort.dataType === "number")
    {
      if(value) return parseFloat(value.toString()); 
      return 0; 
    } 
    if(columnToSort.dataType === "date" )
    {
        if(value) return Date.parse(value.toString());
        return Date.parse("-62167216995000");
    } 
    return value ? value.toString():"";
}

/**
 * Sorts the items by number, date or text
 * @param items items to sort
 * @param columnToSort the column used for sorting
 * @returns a sorted array
 */
export function sortItems(items:any[], columnToSort:PaginationTableColumn|undefined):any[]
{
    if(!columnToSort) return items;
    return items.sort((a:any,b:any) =>
    {
        if(columnToSort.dataType === "number" || columnToSort.dataType === "date")
        {
            const res = columnToSort.order === "up" ? 
                getValueWithType(a, columnToSort) - getValueWithType(b, columnToSort):
                getValueWithType(b, columnToSort) - getValueWithType(a, columnToSort)
            return res;
        }
        else if(columnToSort.dataType === "text")
        {
            const res = columnToSort.order === "up" ? 
                getValueWithType(a, columnToSort).toString().localeCompare(getValueWithType(b, columnToSort).toString()):
                getValueWithType(b, columnToSort).toString().localeCompare(getValueWithType(a, columnToSort).toString());
            return res;
        }
        else return -1;
    });
}

/**
 * Fetches the items on a certain page
 * @param items an array of pagexitem items
 * @param page the page to fetch the items
 * @returns an array of items
 */
export function getPage(items:any[][], page:number)
{
    return items.length < page-1 ? items[page-1]:[];
}

/**
 * Calculates the number of pages necessary to represent an array with pages of x items
 * @param items list of items
 * @param itemsPerPage number of items a page has at the most
 * @returns 
 */
export function getPages(items:any, itemsPerPage:number):number
{
    const pageRemainder = items.length % itemsPerPage;
    return  Math.floor(items.length/itemsPerPage)+(pageRemainder>0?1:0);
}

/**
 * Generates an array of pages with items. Skips undefined objects
 * @param items the data
 * @param itemsPerPage the number of items a page has
 * @returns pagexitem array
 */
export function paginate(items:any[], itemsPerPage:number|undefined, ):any[][]
{
    let result:any[][] = [];
    if(itemsPerPage === undefined) 
    {
        result.push(items);
        return result;
    }
    else{
        const pages = getPages(items, itemsPerPage)
        let index = 0;
        for(var pageCounter = 0; pageCounter<pages; pageCounter++)
        {
            const newPage = [];
            for(var itemCounter = 0; itemCounter < itemsPerPage; itemCounter++)
            {
                if(items[index])
                {
                    newPage.push(items[index]);
                }
                index++;
            }
            result.push(newPage);
        }
        return result;
    }
    
}