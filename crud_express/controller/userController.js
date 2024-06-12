const data = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Doe', email: 'jane@example.com' }
  ];

class userController {

    //Создание пользователя
    async createUser(req, res) {
        try {
            const newUser = {
                id: data.length + 1,
                name: req.body.name,
                email: req.body.email,
            }
            data.push(newUser);
            return res.status(201).json({message: 'Пользователь создан'})
        } catch (error) {
           return res.status(500).json({message:`${error.message}`})
        }
    }

    //Получение всех данных
    async getAllUser(req, res){
        try {
            return res.json(data);
        } catch (error) {
            return res.status(500).json({message: `${error.message}`})
        }
    }

    //Получение конкретного пользователя
    async getOneUser(req, res){
        try {
            const oneUser = data.find(u => u.id === parseInt(req.params.id))
            if(!oneUser){
                return res.status(404).json({message: "ID не найден"})
            }
            return res.json(oneUser)

        } catch (error) {
           return res.status(500).json({message:`${error.message}`})
        }

    }
    
    //Обновлление конкретного пользователя
    async updateUser(req, res){
        try {
            const userIndex = data.findIndex(u => u.id === parseInt(req.params.id));
            if (userIndex !== -1){
                data[userIndex] = { ...data[userIndex], ...req.body};
                return res.json(data[userIndex])
            } else {
                return res.status(404).json({message: "ID не найден"})
            }
        } catch (error) {
            return res.status(500).json({message:`${error.message}`})
        }
    }

    //Удаление конкретного пользователя
    async deleteUser(req, res){
        try {
            const userIndex = data.findIndex(u => u.id === parseInt(req.params.id));
            if(userIndex !== -1) {
                return res.json({message: "Пользователь удален"})
            }else {
                return res.status(404).json({message: "ID не найден"})
            }
        } catch (error) {
            return res.status(500).json({message:`${error.message}`})
        }
    }


}

export default new userController();