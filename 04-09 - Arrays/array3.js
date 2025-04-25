const paises = ["AR", "BR", "JP", "ES", "IT"];

// Percorre cada elementos do array paises
for (let index in paises){
    console.log(`${Number(index) + 1}º país → ${paises[index]}`); 
}