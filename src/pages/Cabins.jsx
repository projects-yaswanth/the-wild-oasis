// @ts-nocheck
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable";
import { useState } from "react";
import Button from "../ui/Button";
import CreateCabinForm from "../features/cabins/CreateCabinForm";

function Cabins() {
  const [openForm, setOpenForm] = useState(false);
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>Filter / sort</p>
      </Row>
      <Row>
        <CabinTable />
        <Button onClick={() => setOpenForm((form) => !form)}>
          Add New Cabin
        </Button>
        {openForm && <CreateCabinForm />}
      </Row>
    </>
  );
}

export default Cabins;
