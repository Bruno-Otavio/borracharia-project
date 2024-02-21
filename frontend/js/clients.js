const clientData = document.querySelector("#table-data");
const form = document.querySelector("#form-new");
const deleteBtns = document.querySelector(".delete-btn");

const backendUrl = "http://localhost:3000";

window.onload = () => {
	renderClients(clientData);
}

async function renderClients(element) {
	const data = await fetch(`${backendUrl}/clients`, { method: "GET" })
		.then(res => res.json());
	
	data.forEach((client) => {
		element.innerHTML += `
			<td class="client-id">${client.id_client}</td>
			<td class="client-cpf">${client.cpf}</td>
			<td class="client-name">${client.nome} ${client.sobrenome}</td>
			<td class="client-number">${client.numero}</td>
			<td><img src="../assets/interface-edit.svg" class="edit-btn"></td>
			<td class="hidden"><img src="../assets/interface-checked.svg" class="apply-btn"></td>
			<td class="hidden"><img src="../assets/interface-close.svg" class="cancel-btn"></td>
			<td><img src="../assets/interface-delete.svg" class="delete-btn"></td>
		`;
	});
}

function getClient(element) {
	const client = { 
		id: element.querySelector(".client-id").textContent, 
        cpf: element.querySelector(".client-cpf").textContent, 
		name: element.querySelector(".client-name").textContent,
        sobrenome: element.querySelector(".client-name").textContent.split(" "),
		number: element.querySelector(".client-number").textContent, 
	} 
	return client; 
}

function toggleEdit(element, bool) {
	const cells = element.cells;
	for (let i = 1; i < cells.length-4; i++) {
		cells[i].setAttribute("contenteditable", `${bool}`);
	}
	for (let i = cells.length-2; i > cells.length-5; i--) {
		cells[i].classList.toggle("hidden");
	}
}

form.addEventListener("submit", (event) => {
	const client = {
        cpf: event.target.cpf.value,
		name: event.target.name.value,
		sobrenome: event.target.sobrenome.value,
		number: event.target.numero.value,
	};

	const request = new Request(`${backendUrl}/clients`, {
		method: "POST",
		body: JSON.stringify(client),
		headers: new Headers({
			Accept: 'application/json',
			"Content-Type": "application/json",
		})
	});

	fetch(request);
});

clientData.addEventListener("click", (event) => {
	const clientElement = event.target.parentNode.parentNode;	
	const button = event.target;

	if (button.classList.contains("delete-btn")) {
		const client = getClient(clientElement);
		fetch(`${backendUrl}/clients/${client.id}`, { method: "DELETE" })
			.then(res => res.json())
			.then(window.location.reload());

	} else if (button.classList.contains("edit-btn")) {
		toggleEdit(clientElement, true);

	} else if (button.classList.contains("apply-btn")) {
		toggleEdit(clientElement, false);
		const client = getClient(clientElement);

		const request = new Request(`${backendUrl}/clients/${client.id}`, {
			method: "PUT",
			body: JSON.stringify(client),
			headers: new Headers({
				Accept: "application/json",
				"Content-Type": "application/json"
			})
		})	

		fetch(request)
			.then(res => res.json())

	} else if (button.classList.contains("cancel-btn")) {
		toggleEdit(clientElement, false);

		const client = getClient(clientElement);
		const cancel = async () => {
			const defaultclient = await fetch(`${backendUrl}/clients/${client.id}`)
				.then(res => res.json());

			clientElement.querySelector(".client-name").textContent = defaultclient.nome + " " + defaultclient.sobrenome;
			clientElement.querySelector(".client-number").textContent = defaultclient.number;
			clientElement.querySelector(".client-cpf").textContent = defaultclient.cpf;
		}
		cancel();
	}
})
