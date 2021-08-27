import { useState, React } from "react";
import { db } from "../firebase";
import { Badge, Heading, Button, Grid, Box, Input, Wrap } from "@chakra-ui/react";

function AdminCategory() {
  const categoryDefault = {
    name: "",
    color: "",
  };
  const [colorPicked, SetColorPicked] = useState("blackAlpha");
  const [newCategory, setNewCategory] = useState(categoryDefault);
  const colors = [
    "blackAlpha",
    "blue",
    "cyan",
    "facebook",
    "gray",
    "green",
    "linkedin",
    "messenger",
    "orange",
    "pink",
    "purple",
    "red",
    "teal",
    "telegram",
    "twitter",
    "whatsapp",
    "yellow",
  ];
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

  function show(s) {
    SetColorPicked(s);
    setNewCategory({ ...newCategory, color: s });
    console.log(colorPicked);
  }
  const handleCategoryName = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    setNewCategory({ ...newCategory, [name]: value });
  };
  const addCategory = (cat) => {
    if (checkCamps(cat)) {
      db.collection("setup").doc().set(newCategory);
      setNewCategory(categoryDefault);
      alert("Categoria agregada");
    } else {
      alert("Por Favor seleccione un color y escriba un nombre");
    }
  };
  return (
    <Box p="5" width="500px" borderRadius='20px' backgroundColor='white'>
      <Wrap spacing="30px" justify="center">
      <Heading as="h2" mb="5px">
        Crear nueva categoria
      </Heading>
      <Input
        mb="10px"
        value={newCategory.name}
        name="name"
        width="300px"
        placeholder="Ingresa un nombre"
        onChange={handleCategoryName}
        borderRadius='20px'
      ></Input>
      
      <Box width="245px" borderWidth="2px">
      <Badge
        variant="solid"
        width="234px"
        textAlign="center"
        display="block"
        m="5px"
        colorScheme={colorPicked}
      >
        Seleciona Color
      </Badge>
        <Grid templateColumns="repeat(5,2fr)" width="100px">
          {colors.map((e, i) => {
            return (
              <Button
                key={i}
                m="1"
                width="10px"
                onClick={() => show(e)}
                colorScheme={e}
              ></Button>
            );
          })}
        </Grid>
        <Button
        mt="15px"
        colorScheme="twitter"
        onClick={() => addCategory(newCategory)}
      >
        Crear categoria
      </Button>
      </Box>
      
      </Wrap>
    </Box>
  );
}

export default AdminCategory;
