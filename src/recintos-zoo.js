
class RecintosZoo {
    constructor() {
        
        this.recintos = [
            { numero: 1, bioma: 'savana', tamanho: 10, animais: ['macaco'], qtd: [3] },
            { numero: 2, bioma: 'floresta', tamanho: 5, animais: [], qtd: [] },
            { numero: 3, bioma: ['savana', 'rio'], tamanho: 7, animais: ['gazela'], qtd: [1] },
            { numero: 4, bioma: 'rio', tamanho: 8, animais: [], qtd: [] },
            { numero: 5, bioma: 'savana', tamanho: 9, animais: ['leao'], qtd: [1] }
        ];

        
        this.animais = {
            LEAO: { tamanho: 3, bioma: 'savana' },
            LEOPARDO: { tamanho: 2, bioma: 'savana' },
            CROCODILO: { tamanho: 3, bioma: 'rio' },
            MACACO: { tamanho: 1, bioma: ['savana', 'floresta'] },
            GAZELA: { tamanho: 2, bioma: 'savana' },
            HIPOPOTAMO: { tamanho: 4, bioma: ['savana', 'rio'] }
        };
    }

    analisaRecintos(animal, quantidade) {
        
        if (!this.animais[animal.toUpperCase()]) {
            return { erro: 'Animal inválido' };
        }

        
        if (quantidade <= 0 || !Number.isInteger(quantidade)) {
            return { erro: 'Quantidade inválida' }; 
        }

        
        const animalInfo = this.animais[animal.toUpperCase()];
        
        const recintosViaveis = [];

        
        this.recintos.forEach(recinto => {
            
            let biomaAdequado;
            if (Array.isArray(animalInfo.bioma)) {
            
                if (Array.isArray(recinto.bioma)) {
                    biomaAdequado = animalInfo.bioma.some(b => recinto.bioma.includes(b));
                } else {
                    biomaAdequado = animalInfo.bioma.includes(recinto.bioma);
                }
            } else {
                
                biomaAdequado = recinto.bioma === animalInfo.bioma;
            }

            
            if (biomaAdequado) {
                const animaisExistentes = recinto.animais;                 
                let espacoOcupado = 0;

                
                for (const [index, animal] of recinto.animais.entries()) {
                    const animalAtual = this.animais[animal.toUpperCase()];
                    const quantidadeAtual = recinto.qtd[index];
                    if (animalAtual) {
                        espacoOcupado += animalAtual.tamanho * quantidadeAtual;
                    }
                }

               
                const verificaSeCarnivoro = animaisExistentes.some(a => ['LEAO', 'LEOPARDO', 'CROCODILO'].includes(a.toUpperCase()));
                if (verificaSeCarnivoro && !['LEAO', 'LEOPARDO'].includes(animal.toUpperCase())) {
                    
                    return;
                }

                let consideraEspacoExtra = 0;
                
                if (recinto.numero === 3 && animaisExistentes.includes('gazela') && animal.toUpperCase() === 'MACACO' && quantidade >= 2) {
                    consideraEspacoExtra = 1; 
                } else if (animaisExistentes.length > 1) {
                    consideraEspacoExtra = 1; 
                }

                
                const espacoNecessario = (quantidade * animalInfo.tamanho) + consideraEspacoExtra;
                
                const espacoLivre = recinto.tamanho - (espacoOcupado + espacoNecessario);

                
                if (espacoNecessario <= (recinto.tamanho - espacoOcupado)) {
                    
                    recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${espacoLivre} total: ${recinto.tamanho})`);
                }
            }
        });

        if (recintosViaveis.length === 0) {
            return { erro: 'Não há recinto viável' };
        }

        return { recintosViaveis };
    }
}

const zoo = new RecintosZoo();
const resultado = zoo.analisaRecintos("MACACO", 2);
console.log(resultado);

export { RecintosZoo as RecintosZoo };

