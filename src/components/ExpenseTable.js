import { React, useState, useEffect } from "react";
import { db } from "../firebase";
import {
  Tag,
  Box,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  Select,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
} from "@chakra-ui/react";
import moment from "moment";
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import 'react-datepicker/dist/react-datepicker-cssmodules.css'
moment.locale("es");

function ExpenseTable() {
  const [dataExpenses, setDataExpenses] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [datePicked, setDatePicked] = useState(['01-07-2021','30-07-2021']);
  const sucursales = [
    {
      name: "Capilla",
      color: "cyan",
    },
    {
      name: "La Cumbre",
      color: "orange",
    },
  ];

  function ordenar (data){
    function ordenarFecha (fechaString) {
    let fechaSp = fechaString.split("-");
    let anio = new Date().getFullYear();
    if (fechaSp.length === 3) {
      anio = fechaSp[2];
    }
    let mes = fechaSp[1] - 1;
    let dia = fechaSp[0];
  
    return new Date(anio, mes, dia);
  }
    const arr2 = 
  data.sort(function (a, b) { 
    return ordenarFecha(a.fecha) - ordenarFecha(b.fecha); 
  }).reverse()
    
   return arr2
  }


  const getCategories = async () => {
    db.collection("setup").onSnapshot((querySnapshot) => {
      const cates = [];
      querySnapshot.forEach((cate) => {
        cates.push({ ...cate.data(), id: cate.id });
      });
      setCategories(cates);
    });
  };

  const getData = async () => {
    db.collection("gastos").onSnapshot((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      setExpenses(ordenar(docs));
      setDataExpenses(ordenar(docs));
    });
  };

 

  useEffect(() => {
    getCategories();
    getData();
 }, []);

  const catColor = (category, arr) => {
    const colorIndex = arr.findIndex((cat) => cat.name === category);
    return arr[colorIndex].color;
  };
  const filterByCategory = (e) => {
if (e.target.value === "") {
      setExpenses((dataExpenses));
    } else {
      const toFilter = dataExpenses.filter(
        (p) => p.category === e.target.value
      );
      setExpenses(toFilter);
      console.log(toFilter)
    }
  };
  const expenseSum = (exp) => {
    return exp.reduce((acum, curr) => {
      return acum + curr.amount;
    }, 0);
  };

  const filterByDate = (arr) => {
    console.log(datePicked)
    return arr.filter(
      (n) => n.fecha >= moment(datePicked[0]).format("DD-MM-Y") && n.fecha <= moment(datePicked[1]).format("DD-MM-Y")
    );
  };
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  return (
    
    <Box backgroundColor='white' borderRadius='20px' width="xl" p="10">
      
      <Select borderRadius='20px'
        placeholder="Filtrar por categoría"
        name="cat filter"
        onChange={filterByCategory}
      > 
        {categories.map((c) => (
          <option key={c.id}>{c.name}</option>
        ))}
      </Select>
      
      <Stat>
        <StatLabel>Total</StatLabel>
        <StatNumber>${expenseSum(expenses)}</StatNumber>
        <StatHelpText></StatHelpText>
      </Stat>
      {/* <DatePicker selectsRange={true}
      dateFormat='d/mM/Y'
      startDate={startDate}
      endDate={endDate}
      onChange={(update) => {
        setDateRange(update);
        setDatePicked([startDate,endDate])
      }}
      isClearable={true}></DatePicker> */}
      <Table size="xl">
        <Thead>
          <Tr>
            <Th width="500px">Fecha</Th>
            <Th>Monto</Th>
            <Th width="400px">Concepto</Th>
          </Tr>
        </Thead>

        <Tbody>
          {expenses.map((e) => (
            <Tr key={e.id}>
              <Td>{e.fecha}</Td>
              <Td>${e.amount}</Td>
              <Td width="500px">{e.concept}</Td>
              <Td>
                <Tag
                  variant="solid"
                  m="1"
                  colorScheme={catColor(e.category, categories)}
                >
                  {e.category}
                </Tag>
                <Tag
                  variant="solid"
                  m="1"
                  colorScheme={catColor(e.franchise, sucursales)}
                >
                  {e.franchise}
                </Tag>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      
    </Box>
  );
}
export default ExpenseTable;
