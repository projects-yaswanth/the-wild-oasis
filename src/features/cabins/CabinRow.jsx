// @ts-nocheck
import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteRow } from "../../services/apiCabins";
import toast from "react-hot-toast";
import { useState } from "react";
import CreateCabinForm from "./CreateCabinForm";
import CabinEditForm from "./CabinEditForm";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
  const { id, image, discount, maxCapacity, name, regularPrice } = cabin;

  const [showForm, setShowForm] = useState(false);

  const queryClient = useQueryClient();
  const { isPending: isDeleting, mutate } = useMutation({
    mutationFn: deleteRow,
    onSuccess: () => {
      toast.dismiss();
      toast.success("Cabin is deleted");
      queryClient.invalidateQueries();
    },
    onMutate: () => {
      toast.dismiss();
      toast.loading("Cabin is deleting");
    },
    onError: (err) => {
      toast.dismiss();
      toasting = toast.error(err.message);
    },
  });

  window.addEventListener("keydown", (e) => {
    if (showForm && e.key === "Escape") {
      setShowForm(false);
    }
  });

  return (
    <>
      <TableRow role="row">
        <Img src={image} />
        <Cabin>{name}</Cabin>
        <div>Fits upto {maxCapacity}</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        <Discount>{formatCurrency(discount)}</Discount>
        <div>
          <button onClick={() => setShowForm((state) => !state)}>Edit</button>
          <button disabled={isDeleting} onClick={() => mutate(id)}>
            Delete
          </button>
        </div>
      </TableRow>
      {showForm && (
        <CabinEditForm id={id} name={name} setShowForm={setShowForm} />
      )}
    </>
  );
}

export default CabinRow;
