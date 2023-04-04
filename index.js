const prompt = require('prompt-sync')();
const axios = require('./api.js');

async function cadastrar_tarefa() {

    var id = Number(prompt('Digite o ID da Tarefa: '));
    var descricao = prompt('Digite a descricao da tarefa: ');

    try {
        await axios.api.post('/tarefas', {
            id: id, 
            descricao: descricao,
            status: 'Pendente'
        });

        console.log('Tarefa cadastrada com sucesso!');
    } catch (erro) {
        console.log('Erro ao cadastrar tarefa: ', erro.message);

    }
}

async function concluir_tarefa() {

    var id = Number(prompt('Digite o ID da tarefa: '));
    var tarefa = await obterTarefa(id);

    try {
        await axios.api.put(`/tarefas/${id}`, {
            id: id,
            descricao: tarefa.descricao,
            status: 'Concluída'
        });
    } catch (erro) {
        console.log('Erro ao concluir tarefa: ', erro.message);

    }
}

async function excluir_tarefa() {
    var id = Number(prompt('Digite o ID da tarefa: '));

    try {
        await axios.api.delete(`/tarefas/${id}`);

        console.log('Tarefa excluída com sucesso!');
    } catch (erro) {
        console.log('Erro ao concluir tarefa: ', erro.message)
    }
}

async function editar_tarefa() {
    var id = Number(prompt('Digite o ID da tarefa que será alterada: '));
    var descricao = prompt('Digite a nova descrição para a tarefa: ');

    try {
        await axios.api.put(`/tarefas/${id}`, {
            id: id,
            descricao: descricao,
            status: 'Pendente'
        });

        console.log('Tarefa editada com sucesso!');

    } catch (erro) {
        console.log('Erro ao editar tarefa: ', erro.message);

    }
}

async function obterTarefa(id) {
    var response = await axios.api.get(`/tarefas/${id}`);
    var tarefa = response.data

    return tarefa;
}

async function listar_tarefasPendentes() {

    try {

        var response = await axios.api.get('/tarefas');
        var lista = response.data.filter((item) => item.status === 'Pendente');

        console.table(lista);
    } catch (erro) {
        console.log('Erro ao listar tarefas: ', erro.message);
    }
}

async function listar_tarefasConcluidas(){
    
    try{

        var response = await axios.api.get('/tarefas');
        var lista = response.data.filter((item) => item.status === 'Concluida');

        console.table(lista);
    }catch(erro) {
        console.log('Erro ao listar tarefas: ', erro.message)
    }
}



async function main(){

    console.log('Bem-vindo ao sistema de gerenciamento de tarefas');

    do {
        var op;
        console.log(`O que você quer fazer?`);

        console.log(`1 - Cadastrar nova tarefa`);
        console.log(`2 - Editar tarefa`);
        console.log(`3 - Concluir tarefa`);
        console.log(`4 - Excluir tarefa`);
        console.log(`5 - Tarefas pendentes`);
        console.log(`6 - Tarefas concluídas`);
        console.log(`0 - Sair do sistema`);

        op = prompt('Selecione uma opção: ');

        switch (op) {
            case '1':
                await cadastrar_tarefa();
                prompt('Enter para continuar');
                console.clear();
                break;      
            case '2':
                await editar_tarefa();
                prompt('Enter para continuar');
                console.clear();
                break;
            case '3':
                await concluir_tarefa();
                prompt('Enter para continuar');
                console.clear();
                break;
            case '4':
                await excluir_tarefa();
                prompt('Enter para continuar');
                console.clear();
                break;
            case '5':
                await listar_tarefasPendentes();
                prompt('Enter para continuar');
                console.clear();
                break;
            case '6':
                await listar_tarefasConcluidas();
                prompt('Enter para continuar');
                console.clear();
                break;
            case '0':
                console.log('Saindo...');
                break;
            default:
                console.log('Entrada inválida');
                prompt('Enter para continuar');

            }
    } while (op !== '0');
}

main();

