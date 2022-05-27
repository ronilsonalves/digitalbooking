import { createServer, Model, Response } from "miragejs";

/* import sedanIMG from '../assets/sedan.png';
import picapeIMG from '../assets/picape.png';
import familiaIMG from '../assets/familia.png';
import esportivoIMG from '../assets/esportivo.png'; */

export function server() {
  createServer({
    models: {
      user: Model,
      category: Model,
      city: Model,
    },

    seeds(server) {
      server.create("user", { id: 1, name: "Rafael", lastname: "Rodrigues", email: "rodriguesrafael446@gmail.com", password: "123456" });
      server.create("user", { id: 2, name: "Rachel", lastname: "Williams", email: "rachelW@gmail.com", password: "123456" });
      server.create("category", { id: 1, name: "sedan", image: "https://digitalbooking-t2-g5.s3.amazonaws.com/categorias/sedan.png", quantity: 201.783});
      server.create("category", { id: 2, name: "picape", image: "https://digitalbooking-t2-g5.s3.amazonaws.com/categorias/picape.png", quantity: 142.721 });
      server.create("category", { id: 3, name: "família", image: "https://digitalbooking-t2-g5.s3.amazonaws.com/categorias/familia.png", quantity: 92.587 });
      server.create("category", { id: 4, name: "esportivo", image: "https://digitalbooking-t2-g5.s3.amazonaws.com/categorias/esportivo.png", quantity: 60.302 });
      server.create("city", { id: 1, name: "Carapicuíba - SP"});
      server.create("city", { id: 2, name: "Osasco - SP" });
      server.create("city", { id: 3, name: "Sorocaba - SP"});
    },

    routes() {
      this.namespace = "/api";

      this.post("/login", (schema, request) => {
        const { email, password } = JSON.parse(request.requestBody);

        const userExists = schema.where("user", (data) => {
          if(data.email === email) {
            return data;
          }
        });

        const user = userExists.models[0]?.attrs;

        if(!user) {
          return new Response(401, { errors: 'Email ou senha inválidos.'});
        }

        if(user.password !== password) {
          return new Response(401, { errors: 'Email ou senha inválidos.'});
        }

        return {
          user,
          token: "0b8cdecb9f9058eec7ae8db6ca1c76c992590a1d"
        }
      }, {
         timing: 2000
      });

      this.get("/category");
      
      this.get("/city");
    },
  })
}
