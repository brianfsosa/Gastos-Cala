import React from 'react'
import {AccordionItem, Accordion,AccordionButton, Box,AccordionIcon,AccordionPanel,} from '@chakra-ui/react'
import AdminCategory from './AdminCategory'
import AddExpense from './AddExpense'
function Acordion (){

return (
<Accordion  allowMultiple width='xl'>
  <AccordionItem>
    <h2>
      <AccordionButton>
        <Box flex="1" textAlign="left">
          Ingresar Nuevo Gasto
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
      <AddExpense></AddExpense>
    </AccordionPanel>
  </AccordionItem>

  <AccordionItem>
    <h2>
      <AccordionButton>
        <Box flex="1" textAlign="left">
          Crear Nueva Categoria
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
    <AdminCategory></AdminCategory>
    </AccordionPanel>
  </AccordionItem>
</Accordion>)
}

export default Acordion