import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
    let { data, error } = await supabase
        .from('cabins')
        .select('*')

    if (error) {
        console.error(error);
        throw new Error("Cabins not found.");
    }

    return data;
}

export async function createEditCabin(newCabin, id) {
    const hasImagePath = newCabin?.image?.startsWith?.(supabaseUrl);

    const imageName = `${Math.random()}-${newCabin?.image?.name}`.replaceAll("/", "");

    const imgePath = hasImagePath ? newCabin.image : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

    // 1. Create cabin
    let query = supabase
        .from('cabins');

    if (!id)
        query = query.insert([{ ...newCabin, image: imgePath }]);

    if (id)
        query = query.update({ ...newCabin, image: imgePath }).eq("id", id);

    console.log({ ...newCabin, image: imgePath })

    const { error, data } = await query.select()
        .single();;

    if (error) {
        console.error(error);
        throw new Error("Cabin could not be created/updated.");
    }

    // 2. upload image
    if (!hasImagePath) {
        const { error: storageError } = await supabase.storage
            .from("cabin-images")
            .upload(imageName, newCabin.image);

        if (storageError) {
            console.log("data...", data, newCabin.image)
            console.error(storageError);
            await supabase
                .from('cabins')
                .delete()
                .eq("id", data?.id);

            throw new Error("Cabin image could not be uploaded and the cabin was not created.");
        }
    }

    return data;
}

export async function updateCabin(id) {
    let { data, error } = await supabase
        .from('cabins')
        .delete()
        .eq("id", id);

    if (error) {
        console.error(error);
        throw new Error("Cabin could not be updated.");
    }

    return data;
}

export async function deleteCabin(id) {
    let { data, error } = await supabase
        .from('cabins')
        .delete()
        .eq("id", id);

    if (error) {
        console.error(error);
        throw new Error("Cabin could not be deleted.");
    }

    return data;
}