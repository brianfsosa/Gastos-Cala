import React from "react";
import ExpenseTable from "./components/ExpenseTable";
import "./style.css"
import { Box, Wrap } from "@chakra-ui/react";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import AdminCategory from "./components/AdminCategory";
import AddExpense from "./components/AddExpense";

function App() {
  const bgcolor='gray.700'
  return (
   
    <BrowserRouter>
      <Box backgroundColor='orange.400' height="100px" p="5" color="white">
        <Wrap spacing="30px" justify="center">
          <Box backgroundColor={bgcolor} color='white' borderRadius='30px'p='5px' shadow='xl' pr='20px' pl='20px' fontFamily='heading'>
          <Link to="/home">Home </Link>
          </Box>
          <Box backgroundColor={bgcolor} color='white' borderRadius='30px'p='5px'shadow='xl'pr='20px' pl='20px'>

           <Link to="/addCategorie">Agregar Categoria</Link>
          </Box>
          <Box backgroundColor={bgcolor} color='white' borderRadius='30px'p='5px'shadow='xl' pr='20px' pl='20px'>
          <Link to="/addExpense">Agregar Gasto</Link>
          </Box>
        </Wrap>
      </Box>

      <Wrap spacing="30px" justify="center" backgroundColor='gray.300'>
        <Switch>
        <Route path="/addCategorie">
          <AdminCategory></AdminCategory>
        </Route>
        <Route path="/addExpense">
          <AddExpense></AddExpense>
        </Route>
        <Route path="/">
          <ExpenseTable></ExpenseTable>
        </Route>
        </Switch>
      </Wrap>
    </BrowserRouter>
  
  );
}

export default App;
