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
        createLine(disciplina, matricula, prova, nota);
    });
}

handleSubmit();

function createLine(disciplina, aluno, prova, nota) {
    const escopo = document.querySelector('.put-line');
    const mod = document.createElement('span');
    mod.innerHTML = `
    <ul class="detalhe-ul">
				<li>
					Disciplina: <span>${disciplina}</span>
				</li>
				<li>
					Matricula: <span>${aluno}</span>
				</li>
				<li>
					Avaliação: <span>${prova}</span>
				</li>
				<li>
					Nota: <span>${nota}</span>
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
}

function editRow(el) {
    //Criar Ação
}