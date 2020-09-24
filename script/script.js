function handleSubmit() {
    const form = document.querySelector('#my-form');
    form.addEventListener('submit', (evt) => {
        evt.preventDefault();
        const dataForm = (data) => {
            return form.querySelector(data);
        }
        const disciplina = dataForm('#disciplina').value;
        const matricula = dataForm('#matricula').value;
        const prova = dataForm('#prova').value;
        const nota = dataForm('#nota').value;
        const button = dataForm('.form-btn').innerHTML;
        const id = dataForm('.id-line');
        if (button == 'Atualizar') {
            const el = document.getElementById(id.innerHTML);
            updateLine(el, disciplina, matricula, prova, nota);
            clearForm(true);
            window.alert('Atualizado com sucesso!')
        } else {
            createLine(disciplina, matricula, prova, nota);
            clearForm(false);
            window.alert('Criado com sucesso!')
        }
    });
}

handleSubmit();

function createLine(disciplina, aluno, prova, nota) {
    const escopo = document.querySelector('.put-line');
    const mod = document.createElement('span');
    let id = new IDGenerator();
    mod.innerHTML = `
    <ul class="detalhe-ul" id="${id.generate()}">
				<li>
					Disciplina: <span class="lineValue l-disciplina" >${disciplina}</span>
				</li>
				<li>
					Matricula: <span class="lineValue l-matricula">${aluno}</span>
				</li>
				<li>
					Avaliação: <span class="lineValue l-prova">${prova}</span>
				</li>
				<li>
					Nota: <span class="lineValue l-nota">${nota}</span>
				</li>
				<li>
					Ação: <a><span onclick="editRow(this)">editar</span></a> /
					<a><span onclick="deleteRow(this)">exluir</span></a>
				</li>
			</ul>
    `;

    escopo.appendChild(mod)
}

function deleteRow(el) {
    const elemento = el.parentElement.parentElement.parentElement;
    elemento.remove();
    window.alert('Removido com sucesso!');
}

function editRow(el) {
    const elemento = el.parentElement.parentElement.parentElement;
    const linhas = elemento.querySelectorAll('.lineValue');
    let disciplina = '', matricula = '', avaliacao = '', nota = '';
    linhas.forEach(val => {
        if (val.classList.contains('l-disciplina')) {
            disciplina = val.innerHTML;
        }
        else if (val.classList.contains('l-matricula')) {
            matricula = val.innerHTML;
        }
        else if (val.classList.contains('l-prova')) {
            avaliacao = val.innerHTML;
        }
        else if (val.classList.contains('l-nota')) {
            nota = val.innerHTML;
        }
    });

    const form = document.querySelector('#my-form');
    const dataForm = (data) => {
        return form.querySelector(data);
    }

    dataForm('#disciplina').value = disciplina;
    dataForm('#matricula').value = matricula;
    dataForm('#prova').value = avaliacao;
    dataForm('#nota').value = nota;
    dataForm('.form-btn').innerHTML = 'Atualizar';
    dataForm('#matricula').disabled = true;
    dataForm('#prova').disabled = true;
    dataForm('#disciplina').disabled = true;
    let elem = document.createElement('span');
    elem.classList.add('esconder');
    elem.classList.add('id-line')
    elem.innerHTML = elemento.getAttribute('id');
    console.log(elemento.getAttribute('id'))
    form.appendChild(elem)
    window.scrollTo(0, 0);
}

function updateLine(el, disciplina, aluno, prova, nota) {
    el.innerHTML = `
				<li>
					Disciplina: <span class="lineValue l-disciplina" >${disciplina}</span>
				</li>
				<li>
					Matricula: <span class="lineValue l-matricula">${aluno}</span>
				</li>
				<li>
					Avaliação: <span class="lineValue l-prova">${prova}</span>
				</li>
				<li>
					Nota: <span class="lineValue l-nota">${nota}</span>
				</li>
				<li>
					Ação: <a><span onclick="editRow(this)">editar</span></a> /
					<a><span onclick="deleteRow(this)">exluir</span></a>
				</li>
    `;
}

function handleMenu(context) {
    const valor = context.innerHTML;
    const gerenciarNota = document.querySelector('.gerenciar-nota');
    const dashboard = document.querySelector('.gerenciar-dashboard');
    if (valor == 'Gerenciar Notas') {
        gerenciarNota.classList.remove('esconder');
        dashboard.classList.add('.esconder');
    }
    else if (valor == 'Dashboard') {
        gerenciarNota.classList.add('esconder');
        dashboard.classList.remove('.esconder');
    }
}

function IDGenerator() {

    this.length = 8;
    this.timestamp = +new Date;

    var _getRandomInt = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    this.generate = function () {
        var ts = this.timestamp.toString();
        var parts = ts.split("").reverse();
        var id = "";

        for (var i = 0; i < this.length; ++i) {
            var index = _getRandomInt(0, parts.length - 1);
            id += parts[index];
        }

        return id;
    }
}

function clearForm(id) {
    const form = document.querySelector('#my-form');
    const dataForm = (data) => {
        return form.querySelector(data);
    }
    dataForm('#disciplina').value = '';
    dataForm('#matricula').value = '';
    dataForm('#prova').value = '';
    dataForm('#nota').value = '';
    dataForm('.form-btn').innerHTML = 'Salvar';
    if (id) {
        dataForm('.id-line').remove();
    }
    dataForm('#matricula').disabled = false;
    dataForm('#prova').disabled = false;
    dataForm('#disciplina').disabled = false;
}