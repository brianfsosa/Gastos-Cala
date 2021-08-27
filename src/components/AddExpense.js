import React, { useState, useEffect } from "react";
import {
  Button,
  Box,
  Input,
  Flex,
  NumberInputField,
  FormControl,
  NumberInput,
  FormLabel,
  Select,
  Wrap
} from "@chakra-ui/react";
import { db } from "../firebase";
import moment from "moment";
moment.locale("es");

function AddExpense() {
  const today = moment().format("DD-MM-Y");
  const [categories, setCategories] = useState([]);
  const expensesDefault = {
    fecha: today,
    concept: "",
    category: "",
    franchise: "",
    amount: 0,
  };
  const [newExpense, setNewExpense] = useState(expensesDefault);
  const checkCamps = (obj) => {
    const objProps = Object.keys(obj);
    return objProps.every((k) => {
      if (obj[k]) {
        return true;
      } else {
        return false;
      }
    });
  };
  useEffect(() => {
    getCategories();
  }, []);
  const getCategories = async () => {
    db.collection("setup").onSnapshot((querySnapshot) => {
      const cates = [];
      querySnapshot.forEach((cate) => {
        cates.push({ ...cate.data(), id: cate.id });
      });
      setCategories(cates);
    });
  };

  const changeSearchNum = (e) => {
    const { name, value } = e.target;
    if (name === "amount") {
      setNewExpense({ ...newExpense, [name]: parseInt(value) });
    } else {
      setNewExpense({ ...newExpense, [name]: value });
    }
  };
  const changeSearch = (e) => {
    const { name, value } = e.target;

    setNewExpense({ ...newExpense, [name]: value });
  };



  const addFirebase = (exp) => {
    if (checkCamps(exp)) {
      db.collection("gastos").doc().set(exp);
      console.log(!newExpense);
      setNewExpense({ ...expensesDefault });
      alert("Gasto Agregado");
    } else {
      alert("Por favor complete todos los campos");
    }
  };
  return (
    <div>
     
      <Box width="600px" padding="20px" borderRadius='20px' backgroundColor='white'>
      <Wrap spacing="30px" justify="center">
        <form >
          <Flex>
            <Box>
              <FormLabel paddingLeft='10px'>Concepto</FormLabel>
              <Input
                ml="5px"
                placeholder="Concepto"
                name="concept"
                width="300px"
                onChange={changeSearch}
                value={newExpense.concept}
                borderRadius='20px'
              ></Input>
            </Box>
            <Box>
              <FormLabel width="100px">Importe</FormLabel>
              <NumberInput
                ml="5px"
                step={50}
                min={0}
                name="amount"
                value={newExpense.amount}
                borderRadius='20px'
              >
                <NumberInputField
                  width="100px"
                  onChange={changeSearchNum}
                  placeholder="0"
                  value={newExpense.amount}
                  borderRadius='20px'
                ></NumberInputField>
              </NumberInput>
            </Box>
            </Flex>
            <Flex>
            <Box>
              <FormLabel>Sucursal</FormLabel>
              <FormControl ml="5px" id="sucursal" name="franchise">
                <Select
                  onChange={changeSearch}
                  name="franchise"
                  placeholder="Sucursal"
                  value={newExpense.franchise}
                  width='200px'
                  borderRadius='20px'
                >
                  <option>Capilla</option>
                  <option>La Cumbre</option>
                  
                </Select>
              </FormControl>
            </Box>
            <Box>
              <FormLabel>Categoria</FormLabel>
              <FormControl ml="5px" id="categoría" name="category">
                <Select
                  onChange={changeSearch}
                  name="category"
                  placeholder="Categoria"
                  value={newExpense.category}
                  width='200px'
                  borderRadius='20px'
                >
                  {categories.map((c) => (
                    <option key={c.id}>{c.name}</option>
                  ))}
                </Select>
              </FormControl>
            </Box>
            </Flex>

          <Button borderRadius='10' colorScheme='blue' mt="5" onClick={() => addFirebase(newExpense)}>
            Agregar gasto
          </Button>
        </form>
      </Wrap>
      </Box>
    </div>
  );
}
export default AddExpense;
