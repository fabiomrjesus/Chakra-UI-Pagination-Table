import * as React from "react"
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
  BoxProps,
  StackProps,
  HStack,
} from "@chakra-ui/react"
import { ColorModeSwitcher } from "./ColorModeSwitcher"
import { Logo } from "./Logo"
import PaginationTable from "./components/chakra-ui-table/chakra-ui-pagination-table"
import { PaginationTableColumn } from "./components/chakra-ui-table/chakra-ui-pagination-table.model"


export function NameWrapper({children}:StackProps)
{
  return <HStack>
    <Text fontWeight="bold">Name:</Text>
    <Text>{children}</Text>
  </HStack>
}
export const App = () => {
  
  const items = [{id:1, name:"B"},{id:3, name:"C"},{id:4, name:"D"},{id:5, name:"E"},{id:6, name:"F"},{id:7, name:"G"},{id:2, name:"H"},{id:8, name:"A"} ];
  const columns:PaginationTableColumn[] = [{header:"Id", accessor:"id", dataType:"number"}, {header:"Name", accessor:"name", dataType:"text", Wrapper:NameWrapper}]
  return (
  <ChakraProvider theme={theme}>
    <Box textAlign="center" fontSize="xl">
      <Box w="100vw" h="100vh" px="15rem" py="10">
        <PaginationTable data={items} columns={columns} itemsPerPageOptions={[5,10,25,100]}></PaginationTable>
      </Box>
    </Box>
  </ChakraProvider>
)}
