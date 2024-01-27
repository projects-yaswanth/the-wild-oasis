// @ts-nocheck

import styled from "styled-components";
import Heading from "../../ui/Heading";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { getRow, updateRow } from "../../services/apiCabins";

const StyledDiv = styled.div`
  height: 80vh;
  width: 82%;
  background-color: #ffffff;
  color: black;
  position: absolute;
  top: 95px;
  left: 300px;
  border-radius: 25px;
  padding: 3rem 5rem;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 5rem 1fr 5rem;
  gap: 3rem;
  z-index: 999;
`;

const Editform = styled.form`
  display: grid;
  grid-template-columns: 1fr;
  padding: 0 10rem;
`;

const FormEle = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
  border-bottom: 1px solid var(--color-grey-100);
`;

const LabelEdit = styled.label`
  width: 20rem;
`;

const InputEdit = styled.input`
  border: 1px solid var(--color-grey-200);
  border-radius: 5px;
  height: 4rem;
  width: 55rem;
  padding: 5px 15px;
  box-shadow: var(--shadow-sm);
`;

const TextareaEdit = styled.textarea`
  border: 1px solid var(--color-grey-200);
  border-radius: 5px;
  padding: 5px 15px;
  box-shadow: var(--shadow-sm);
`;

const ButtonDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 3rem 2rem;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function CabinEditForm({ id, setShowForm, name }) {
  const {
    isPending,
    error,
    data: cabin,
  } = useQuery({
    queryKey: ["row"],
    queryFn: () => getRow(name),
  });

  const { register, handleSubmit, getValues, formState } = useForm();
  const { errors } = formState;

  const queryClient = useQueryClient();
  const { mutate, isPending: isEditing } = useMutation({
    mutationFn: updateRow,
    onSuccess: () => {
      toast.dismiss();
      toast.success("Cabin is Edited");
      queryClient.invalidateQueries();
    },
    onMutate: () => {
      toast.dismiss();
      toast.loading("Cabin is deleting");
    },
    onError: (err) => {
      toast.dismiss();
      toast.error(err.message);
    },
  });

  function OnSubmit(data) {
    const newData = { ...cabin, ...data, image: cabin.image };
    mutate(newData);
  }

  return (
    <React.Fragment>
      <StyledDiv>
        <Heading as="h1">Edit Cabin - {cabin?.name}</Heading>
        <Editform onSubmit={handleSubmit(OnSubmit)}>
          {/* <FormEle>
            <LabelEdit htmlFor="name">Cabin Name</LabelEdit>
            <InputEdit
              type="text"
              name="name"
              id="name"
              defaultValue={cabin?.name}
              {...register("name", {})}
            />
            {errors?.name?.message && <Error>{errors.name.message}</Error>}
          </FormEle> */}
          <FormEle>
            <LabelEdit htmlFor="maxCapacity">Maximum Capacity</LabelEdit>
            <InputEdit
              type="number"
              name="maxCapacity"
              id="maxCapacity"
              defaultValue={cabin?.maxCapacity}
              {...register("maxCapacity", {
                min: {
                  value: 2,
                  message: `Capacity must be atleast 2`,
                },
                max: {
                  value: 10,
                  message: `Capacity must be less than 10`,
                },
              })}
            />
            {errors?.maxCapacity?.message && (
              <Error>{errors.maxCapacity.message}</Error>
            )}
          </FormEle>
          <FormEle>
            <LabelEdit htmlFor="regularPrice">Regular Price</LabelEdit>
            <InputEdit
              type="number"
              name="regularPrice"
              id="regularPrice"
              defaultValue={cabin?.regularPrice}
              {...register("regularPrice", {})}
            />
            {errors?.regularPrice?.message && (
              <Error>{errors.regularPrice.message}</Error>
            )}
          </FormEle>
          <FormEle>
            <LabelEdit htmlFor="discount">Discount</LabelEdit>
            <InputEdit
              type="number"
              name="discount"
              id="discount"
              defaultValue={cabin?.discount}
              {...register("discount", {
                validate: (value) =>
                  value <= getValues().regularPrice ||
                  "Discount must be less than regular price",
              })}
            />
            {errors?.discount?.message && (
              <Error>{errors.discount.message}</Error>
            )}
          </FormEle>
          <FormEle>
            <LabelEdit htmlFor="description">Description for website</LabelEdit>
            <TextareaEdit
              cols={71}
              rows={4}
              name="description"
              id="description"
              defaultValue={cabin?.description}
              {...register("description")}
            />
          </FormEle>
          <FormEle>
            <LabelEdit htmlFor="image">Cabin Photo</LabelEdit>
            <FileInput
              type="file"
              name="image"
              id="image"
              {...register("image")}
            />
            <p>Kindly Leave this, if previous image is fine</p>
          </FormEle>
          <ButtonDiv>
            <Button
              onClick={() => {
                setShowForm((state) => !state);
                queryClient.removeQueries(["row"]);
              }}
              type="medium"
              variation="secondary"
            >
              Cancel
            </Button>
            <Button type="medium" variation="primary">
              Edit Cabin
            </Button>
          </ButtonDiv>
        </Editform>
      </StyledDiv>
    </React.Fragment>
  );
}

export default CabinEditForm;
