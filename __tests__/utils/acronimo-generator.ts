export const acronimoGenerator = () => {
	const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	const digitos = "0123456789";

	let acronimo = "";

	// 4 letras maiúsculas aleatórias
	for (let i = 0; i < 4; i++) {
		const indiceLetra = Math.floor(Math.random() * letras.length);
		acronimo += letras[indiceLetra];
	}

	// 1 dígito aleatório
	const indiceDigito = Math.floor(Math.random() * digitos.length);
	acronimo += digitos[indiceDigito];

	return acronimo;
};
