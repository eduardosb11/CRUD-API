import { ClientesDB, ClientesForm, ClientesDisplay } from "./classes.js";
import { enviar } from "./utils.js";

const endpoint = "6ed774fa81dc47ab9d427742a348c539";
const URL = "https://crudcrud.com/api/" + endpoint + "/clientes";
const db = new ClientesDB(URL);
const form = new ClientesForm(db);
const display = new ClientesDisplay(db);

db.callback = () => display.atualizar(); // atualiza o display sempre que a lista de clientes for atualizada
form.addSubmitListener(() => enviar(db, form, display));
