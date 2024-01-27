import supabase, { supabaseUrl } from "./supabase";

const getCabin = async () => {
  const { error, data } = await supabase.from(" cabins").select("*");
  if (error) {
    console.error(error);
    throw new Error("Cabins cannot be fetched");
  }

  return data;
};

const deleteRow = async (id) => {
  const { data, error } = await supabase.from(" cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabins cannot be deleted");
  }

  return data;
};

const createCabin = async (newCabin) => {
  //pmqfugzxfqqdpfndhtut.supabase.co/storage/v1/object/public/cabins-images/cabin-001.jpg

  const imageName = `${Math.random()}-${newCabin.image[0].name}`;
  const imageUrl = `${supabaseUrl}/storage/v1/object/public/cabins-images/${imageName}`;

  const { data, error } = await supabase
    .from(" cabins")
    .insert([{ ...newCabin, image: imageUrl }])
    .select();

  console.log(newCabin);
  if (error) {
    console.error(error);
    throw new Error("Cabins cannot be deleted");
  }

  const { error: ImageError } = await supabase.storage
    .from("cabins-images")
    .upload(imageName, newCabin.image[0]);

  if (ImageError) {
    console.error(ImageError.message);
    throw new Error("Image is not uploaded");
  }

  return data;
};

export const updateRow = async (newData) => {
  console.log(newData);
  const { data, error } = await supabase
    .from(" cabins")
    .update({ ...newData })
    .eq("name", newData.name)
    .select();

  if (error) {
    console.error(error.message);
    throw new Error("Row is not Updated");
  }

  return data;
};

const getRow = async (name) => {
  const { error, data } = await supabase
    .from(" cabins")
    .select("*")
    .eq("name", name);
  if (error) {
    console.error(error);
    throw new Error("Cabins cannot be fetched");
  }

  return data[0];
};

export { supabase as default, getCabin, deleteRow, createCabin, getRow };
