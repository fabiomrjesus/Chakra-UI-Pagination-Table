# CHAKRA-UI-TABLE
Paginated table for chakra-ui. Currently in testing and optimization

## DEPENDENCIES
1. @chakra-ui/icons
2. react-icons/fa

## USAGE
The table is build from the data, a list of objects that should follow the same model. You can add a list of columns, to filter out unwanted properties, change headers, define data types and column sorting, and add an array of with the number of items you'd like to see in each page. An empty data set will display a message instead. The following is a list of properties for the table:
1. **data** - the list of items displayed on the table. 
1. **name** - the table's name used for ids and as the name of the class that wraps the table, which you can use it for selection purposes such as applying styles to a specific table.
1. **noData** - message displayed when the table has no items to display
1. **columns** - the columns displayed in the table (see Column section below)
1. **itemsPerPageOptions** - a list of options for pagination. an empty list displays all the items in a single page.

#### Example of a list of options for the items per page property
```js
const itemsPerPage = [5,10,25,100]
```
#### Example of a basic table
```js
    <PaginationTable data={items} />
```

## FEATURES

### FILTER
Change the filter to remove unnecessary data. The filter is case sensitive!

### PAGINATION
Set the number of items you want to display and the table generates the pages necessary.

## COLUMNS
A column is described by the PaginationTableColumn model. Its main property is the acessor, a value that represents a key (property) from the object. You can also add an Header to change the text that's being displayed, a data type that helps sorting. The order and sorted properties are used by the sort feature. Setting them in the object allows you to set a default sorting. The Wrapper property is a wrapper that can be used around the value. If you send an HTML object as a property of the row, you won't be able to sort that column. This wrapper allows you to set styles and other components around the value without breaking the sort feature. The following are properties of a column:

1. **accessor** - the property's name.
1. **header** - text displayed in the column header.
1. **dataType** - type of the value that is being displayed / sorted. The possible values are numeric, alphanumeric, date and undefined (no sort).
1. **Wrapper** - An HTMLElement rendering the value
1. **sorted** - the table is sorted by this column if this value is true. Two true sorted properties sort the table by the first one.
1. **order** - determines the sort direction.

## FUTURE WORK

1. Add "Clear Filter" button
1. Add "Custom Items per page"
1. Add ordering types
1. Increase wrapper compatibility
1. Add exception for data with different properties in certain objects when no column set was described
1. Increase sorting compatibility