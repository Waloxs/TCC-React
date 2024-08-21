import { useState, useEffect } from "react";
import Logo from "../../assets/Logo.png";
import { IoIosArrowBack } from "react-icons/io";
import "./EmpresaPasso.css";
import { Link } from "react-router-dom";
import Input from "../../components/Form/input";
import BtnPrincipal from "../../components/Buttons/BtnPrincipal";
import { FaUserPlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser as useUserEmpresa } from "../../services/UserContextEmpresa.jsx";
import InputMask from "react-input-mask";
import { LuPen } from "react-icons/lu";
import "antd/dist/reset.css";
import CurrencyInput from 'react-currency-input-field';
import ClipLoader from "react-spinners/ClipLoader.js";


import { Select } from "antd";

const { Option } = Select;

const EmpresaPasso = () => {
  const [block, setBlock] = useState(true);
  const [block2, setBlock2] = useState(true);
  const [block3, setBlock3] = useState(true);
  const [block4, setBlock4] = useState(true);
  const [block5, setBlock5] = useState(true);
  const [block6, setBlock6] = useState(true);
  const [valor, setValor] = useState("Azul16");
  const [sombra, setSombra] = useState(false);
  const [back, setBack] = useState(false);
  const [image, setImage] = useState(null);
  const [descricao, setDescricao] = useState("");
  const navigate = useNavigate();
  const [profissional, setProfissional] = useState("");
  const [requisits, setRequisits] = useState("Digite aqui");
  const { data: userEmpresa, loading, error } = useUserEmpresa();
  const [telefone, setTelefone] = useState("");
  const [endereco, setEndereco] = useState("");
  const [localizacao, setLocalizacao] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [salar, setSalar] = useState("");
  const [detVagas, setDatVag] = useState("");
  const [isEditable, setIsEditable] = useState(false);
  const [border, setBorder] = useState(null);
  const [border2, setBorder2] = useState(null);
  const [border3, setBorder3] = useState('#E2E8F0');
  const [texto, setTexto] = useState(null);
  const [textoLoca, setTextoLoca] = useState(null);
  const [textoTel, setTextoTel] = useState(null);
  const [borderLoca ,setBorderLoca] = useState('#E2E8F0');
  const [borderTel ,setBorderTel] = useState('#E2E8F0');
  const [borderSalar ,setBorderSalar] = useState('#E2E8F0');


  if (loading) {
    return (
      <div className='flex justify-center items-center' style={{ background: '#fff', height: '100vh' }}>
        <ClipLoader color="#123abc" loading={true} size={100} />
      </div>
    );
  }

  if (error) {
    return <p></p>;
  }


  const handlePenClick = () => {
    setIsEditable(true);
  };

  const handleRegister = async () => {
    const data = {
      profissional,
    };

    console.log(data);
  };

  const handleRegister2 = async () => {
    const data = {
      profissional,
      descricao,
    };

    console.log(data);
  };

  const options = [
    // Tecnologia
    { value: "designer", label: "Designer" },
    { value: "front-end", label: "Front-End" },
    { value: "back-end", label: "Back-End" },
    { value: "full-stack", label: "Full-Stack" },
    { value: "ux-ui", label: "UX/UI Designer" },
    { value: "mobile", label: "Desenvolvedor Mobile" },
    { value: "devops", label: "DevOps" },
    { value: "qa", label: "Quality Assurance (QA)" },
    { value: "data-science", label: "Data Science" },
    { value: "machine-learning", label: "Machine Learning" },
    { value: "cyber-security", label: "Cyber Security" },
    { value: "cloud", label: "Cloud Computing" },

    // Saúde
    { value: "enfermeiro", label: "Enfermeiro" },
    { value: "medico", label: "Médico" },
    { value: "fisioterapeuta", label: "Fisioterapeuta" },
    { value: "nutricionista", label: "Nutricionista" },
    { value: "psicologo", label: "Psicólogo" },
    { value: "dentista", label: "Dentista" },
    { value: "farmaceutico", label: "Farmacêutico" },
    { value: "biomedico", label: "Biomédico" },
    { value: "veterinario", label: "Veterinário" },

    // Educação
    { value: "professor", label: "Professor" },
    { value: "coordenador-pedagogico", label: "Coordenador Pedagógico" },
    { value: "orientador-educacional", label: "Orientador Educacional" },
    { value: "diretor-escolar", label: "Diretor Escolar" },
    { value: "assistente-educacional", label: "Assistente Educacional" },

    // Marketing e Comunicação
    { value: "marketing", label: "Marketing" },
    { value: "publicidade", label: "Publicidade" },
    { value: "relações-públicas", label: "Relações Públicas" },
    { value: "jornalista", label: "Jornalista" },
    { value: "redator", label: "Redator" },
    { value: "social-media", label: "Social Media Manager" },
    { value: "seo", label: "SEO Specialist" },
    { value: "content-creator", label: "Content Creator" },

    // Finanças e Administração
    { value: "financeiro", label: "Financeiro" },
    { value: "contabilista", label: "Contabilista" },
    { value: "auditor", label: "Auditor" },
    { value: "analista-financeiro", label: "Analista Financeiro" },
    {
      value: "gestor-de-recursos-humanos",
      label: "Gestor de Recursos Humanos",
    },
    { value: "administrador", label: "Administrador" },
    { value: "secretario", label: "Secretário" },

    // Vendas e Atendimento ao Cliente
    { value: "vendedor", label: "Vendedor" },
    { value: "representante-comercial", label: "Representante Comercial" },
    { value: "caixa", label: "Operador de Caixa" },
    { value: "gerente-de-loja", label: "Gerente de Loja" },
    { value: "atendente", label: "Atendente" },

    // Engenharia e Construção
    { value: "engenheiro-civil", label: "Engenheiro Civil" },
    { value: "engenheiro-eletrico", label: "Engenheiro Elétrico" },
    { value: "engenheiro-mecanico", label: "Engenheiro Mecânico" },
    { value: "arquiteto", label: "Arquiteto" },
    { value: "mestre-de-obras", label: "Mestre de Obras" },
    { value: "pedreiro", label: "Pedreiro" },

    // Logística e Transporte
    { value: "motorista", label: "Motorista" },
    { value: "entregador", label: "Entregador" },
    { value: "coordenador-de-logistica", label: "Coordenador de Logística" },
    { value: "operador-de-empilhadeira", label: "Operador de Empilhadeira" },

    // Outros
    { value: "advogado", label: "Advogado" },
    { value: "secretaria", label: "Secretária" },
    { value: "garcom", label: "Garçom" },
    { value: "cozinheiro", label: "Cozinheiro" },
    { value: "artista", label: "Artista" },
    { value: "fotografo", label: "Fotógrafo" },
    { value: "tradutor", label: "Tradutor" },
    { value: "bibliotecario", label: "Bibliotecário" },
  ];



  const handleChange = (selected) => {
    setSelectedOptions(selected);
    setRequisits(selected.map((option) => option.value));
  };

  const handleRegister3 = async () => {
    const data = {
      profissional,
      descricao,
      requirements: selectedOptions,
    };

    console.log(data);
  };

  const handleRegister4 = async () => {
    const token = localStorage.getItem("authToken");

    if (token) {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const dado = {
          telefone,
          localizacao: endereco,
        };

        const response = await axios.put(
          "https://workzen.onrender.com/v1/empresa/profile",
          dado,
          config
        );

        console.log(response.data);
      } catch (error) {
        console.error("Erro ao enviar dados:", error);
      }
    } else {
      console.error("Token não encontrado no localStorage");
    }
  };

  const handleRegister5 = async () => {
    const data = {
      profissional,
      descricao,
      requirements: selectedOptions,
      salar,
    };

    console.log(data);
  };

  const criarVaga = async () => {
    const token = localStorage.getItem("authToken");
  
    if (token) {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
  
        const data = {
          title: profissional,
          description: descricao,
          salario: salar,
          requirements: selectedOptions,
          localizacao,
          tags: requisits,
        };
  
        const response = await axios.post(
          "https://workzen.onrender.com/v1/jobs/create",
          data,
          config
        );
  
        console.log(response.data);
  
        // Navega para a página /DashboardEmpresa
        navigate("/DashboardEmpresa");
        
        // Aguarda a navegação antes de recarregar a página
        setTimeout(() => {
          window.location.reload();
        }, 600); // O delay pode ser ajustado conforme necessário
  
      } catch (error) {
        console.error("Erro ao enviar dados:", error);
      }
    } else {
      console.error("Token não encontrado no localStorage");
    }
  };
  

  const handleValueChange = (value) => {
    // Converte o valor para número e verifica se é menor que um milhão
    const numericValue = value ? parseFloat(value.replace(/\D/g, "")) : 0;
    if (numericValue <= 1000000) {
      setSalar(value); // Atualiza o estado somente se o valor for válido
    }
  };

  const formatValue = (val) => {
    // Remove caracteres não numéricos e converte para número
    const number = parseFloat(val.replace(/[^0-9.]/g, ""));
    if (isNaN(number) || number === 0) {
      return ""; // Retorna uma string vazia se o número for zero ou inválido
    }
    // Retorna o valor formatado com separadores de milhar e duas casas decimais
    return number.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const handleSalaryChange = (e) => {
    const rawValue = e.target.value.replace(/[^0-9.]/g, ""); // Remove caracteres não numéricos, mas mantém pontos
    // Atualiza o valor formatado no estado
    setSalar(formatValue(rawValue));
  };

  const handleRegisterFalse = async () => {
    navigate("/DashboardEmpresa");
  };

  const handleClickFalse = (e) => {
    e.preventDefault();
    handleRegisterFalse();
    setBlock(!block);
    setBlock2(!block2);
    setValor("Azul32");
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (profissional.trim() !== "") {
      handleRegister();
      setBlock(!block);
      setBlock2(!block2);
      setValor("Azul32");
      setBorder(null);
      setTexto(false);
    } else {
      setBorder("#EF4444");
      setTexto(true);
    }
  };

  const handleClick2 = (e) => {
    e.preventDefault();
    if (descricao.trim() !== "") {
      handleRegister2();
      setBlock2(!block2);
      setBlock3(!block3);
      setValor("Azul48");
      setBorder2(null);
      setTexto(false);
    } else {
      setBorder2("#EF4444");
      setTexto(true);
    }
  };

  const handleClick3 = (e) => {
    e.preventDefault();

    if (selectedOptions.length !== 0) {
      handleRegister3();
      setBlock3(!block3);
      setBlock4(!block4);
      setValor("Azul64");
      setBorder3('#E2E8F0');
      setTexto(false);
    } else {
      setBorder3("#EF4444");
      setTexto(true);
    }
  };

  const handleClick4 = (e) => {
    e.preventDefault();

    if (telefone.trim() !== "" && localizacao.trim() !== "") {
      handleRegister4();
      setBlock4(!block4);
      setBlock5(!block5);
      setValor("Azul80");
      setTextoLoca(null);
      setBorderLoca('#E2E8F0');
      setTextoTel(null);
      setBorderTel('#E2E8F0');
    } else if (telefone.trim() !== "" && localizacao.trim() === ""){
      setTextoLoca(true);
      setBorderLoca('#EF4444');
  } else if (telefone.trim() === "" && localizacao.trim() !== ""){
      setTextoTel(true);
      setBorderTel('#EF4444');
  } else if (telefone.trim() === "" && localizacao.trim() === ""){
      setTextoLoca(true);
      setBorderLoca('#EF4444');
      setTextoTel(true);
      setBorderTel('#EF4444');
}


}

  const handleClick5 = (e) => {
    e.preventDefault();

    if(salar.trim() !== ""){
     handleRegister5();
     setBlock5(!block5);
     setBlock6(!block6);
     setValor("Azul96");
     setTexto(false);
     setBorderSalar("#E2E8F0");
   }else if(salar.trim() === ""){
      setTexto(true);
      setBorderSalar("#EF4444");
   }
  };

  const handleClick6 = (e) => {
    e.preventDefault();
    criarVaga();
  };

  const handleBackClick = (e) => {
    e.preventDefault();
    if (block === true) {
      navigate("/empresa");
    } else if (block2 === false) {
      setValor("Azul32antes");
      setBlock(true);
      setBlock2(true);
    } else if (block3 === false) {
      setValor("Azul48antes");
      setBlock(false);
      setBlock2(false);
      setBlock3(true);
    } else if (block4 === false) {
      setValor("Azul64antes");
      setBlock4(true);
      setBlock3(false);
    } else if (block5 === false) {
      setValor("Azul80antes");
      setBlock5(true);
      setBlock4(false);
    } else if (block6 === false) {
      setValor("Azul96antes");
      setBlock6(true);
      setBlock5(false);
    }
  };

  const heightValue = !block6 ? "max-content" : "600px";

  return (
    <>
      {userEmpresa && (
        <div
          className={`${back ? "back" : ""} tudo flex justify-center`}
          style={{ width: "100vw" }}
        >
          <div
            className={`${
              sombra ? "sombra" : ""
            } containerEmpresa flex flex-col justify-center items-center`}
            style={{
              width: "70rem",
              background: "#fff",
              height: "100vh",
              gap: "30px",
              padding: "20px",
            }}
          >
            <div className="containerLogo2" style={{ width: "100%" }}>
              <Link to="/" style={{ width: "100%" }}>
                <img src={Logo} alt="Logo" style={{ height: "1.10rem" }} />
              </Link>
            </div>
            <div
              className="conteudo flex"
              style={{
                width: "100%",
                height: "auto",
                border: "2px solid #f7f7f7",
                borderRadius: "1.25rem",
                background: "#fff",
              }}
            >
              <div
                className="flex flex-col"
                style={{
                  height: heightValue,
                  width: "100%",
                  paddingBottom: "150px",
                }}
              >
                <div className="flex items-center">
                  <IoIosArrowBack
                    onClick={handleBackClick}
                    className="m-6"
                    style={{
                      fontSize: "1.5rem",
                      color: "#0866FF",
                      cursor: "pointer",
                    }}
                  />
                  <div className="cxCinza">
                    <div className={`cxAzul ${valor}`}></div>
                  </div>
                </div>
                {block && (
                  <div
                    className="animate flex flex-col"
                    style={{ height: "100%", gap: "5rem" }}
                  >
                    <div
                      className="pd flex flex-col gap-2"
                      style={{ paddingLeft: "4rem", paddingRight: "4rem" }}
                    >
                      <h1 className="PassTitEmp">
                        Vamos começar com um título forte.
                      </h1>
                      <p className="PassParEmp">
                        Isso ajuda a sua vaga a se destacar para os candidatos
                        certos. É a primeira coisa que eles verão, então faça
                        valer a pena!
                      </p>
                    </div>
                    <div
                      className="pd flex flex-col gap-2"
                      style={{ paddingLeft: "4rem" }}
                    >
                      <p className="func">Sua função Profissional</p>
                      <Input
                        type="text"
                        placeholder="Ex: Programador Fullstack"
                        className="lin"
                        border={border}
                        required
                        value={profissional}
                        onChange={(e) => setProfissional(e.target.value)}
                      />
                      {texto && (
                        <div className="flex gap-1">
                          <img src="icons/icon-erro.svg" alt="" />
                          <span
                            style={{
                              color: "#EF4444",
                              fontSize: "0.70rem",
                              fontFamily: "Lexend",
                            }}
                          >
                            Adicione uma função para continuar!
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {!block2 && (
                  <div
                    className="animate flex flex-col"
                    style={{ height: "100%", gap: "5rem" }}
                  >
                    <div className="pd2" style={{ paddingLeft: "4rem" }}>
                      <div
                        className="m flex flex-col gap-2"
                        style={{ marginRight: "30px" }}
                      >
                        <h1
                          className="PassTitEmp2"
                          style={{ maxWidth: "30ch" }}
                        >
                          Perfeito, agora adicione uma descrição a sua vaga.
                        </h1>
                        <div className="ctnLista">
                          <p className="PassPar3Empresa">
                            O que os talentos procuram:
                          </p>
                          <ul className="lista-emp">
                            <li>Expectativas claras sobre seu emprego</li>
                            <li>
                              As habilidades necessárias para o seu trabalho
                            </li>
                            <li>Boa comunicação</li>
                            <li>
                              Detalhes sobre como você ou sua equipe gostam de
                              trabalhar
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div
                        className="flex flex-col gap-2 ctnArea"
                        style={{ marginBottom: "5rem" }}
                      >
                        <p className="PassPar2">Descreva o que você precisa</p>
                        <textarea
                          className="txAreaEmp"
                          id="area3"
                          style={{
                            height: "220px",
                            resize: "none",
                            border: `2px solid ${border2}`,
                            outline: "none",
                          }}
                          value={descricao}
                          onChange={(e) => setDescricao(e.target.value)}
                          placeholder="Já tem uma descrição? cole aqui!"
                        />
                        {texto && (
                          <div className="flex gap-1">
                            <img src="icons/icon-erro.svg" alt="" />
                            <span
                              style={{
                                color: "#EF4444",
                                fontSize: "0.70rem",
                                fontFamily: "Lexend",
                              }}
                            >
                              Adicione uma Descrição para continuar!
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
                {!block3 && (
                  <div
                    className="animate flex flex-col"
                    style={{ height: "100%", gap: "5rem" }}
                  >
                    <div
                      className="pd flex flex-col gap-2"
                      style={{ paddingLeft: "4rem", paddingRight: "4rem" }}
                    >
                      <h1 className="PassTit3">
                        Maravilha. Agora adicione habilidades que gostaria que
                        seu profissional tenha.
                      </h1>
                      <p className="PassPar3">
                        isso nos ajudara a encontrar o profissional ideal para
                        voicê, com base nas habilidades que você procura.
                      </p>
                    </div>
                    <div
                      className="pd flex flex-col gap-2"
                      style={{
                        paddingLeft: "4rem",
                        paddingRight: "4rem",
                        marginBottom: "5rem",
                      }}
                    ></div>
                    <div
                      className="flex flex-col gap-2"
                      style={{ marginTop: "-100px" }}
                    >
                      <div
                        className="pd flex flex-col gap-2"
                        style={{ paddingLeft: "4rem", width: '100%' }}
                      >
                        <p className="func">Habilidades</p>
                        
                        <div
  style={{
    maxWidth: 'calc(100% - 4rem)',
    height: "max-content",
    overflowX: "auto",
    display: "flex",
    alignItems: "center",
    scrollSnapType: "x mandatory",
    borderRadius: '15px', 
    outline: 'none',
    border: `2px solid ${border3}`
  }}

  className="cx-sel"
>
  <Select
    mode="multiple"
    options={options}
    value={selectedOptions}
    onChange={handleChange}
    placeholder="Selecione as opções..."
    style={{ minHeight: "40px", flex: 1 , maxWidth: 'auto'}}
    dropdownStyle={{ maxHeight: 200, overflow: 'hidden' }}
    suffixIcon={null}
    tagRender={(props) => {
      const { label, closable, onClose } = props;

      return (
        <div
          style={{
            display: 'inline',
            whiteSpace: 'nowrap',
            marginRight: '8px',
            overflow: 'hidden',
            maxWidth: '100px'
          }}
        >
          <span className="tagSelect" style={{background: '#F1F5F9', borderRadius: '10px', padding: '3px 15px'}}>{label}</span>
          {closable && (
            <span onClick={onClose} style={{ cursor: 'pointer', marginLeft: '4px' }}>
              
            </span>
          )}
        </div>
      );
    }}
  />
</div>

{texto && (
            <div className="flex items-center gap-1">
            <img src="icons/icon-erro.svg" alt="" />
            <span
              style={{
                color: "#EF4444",
                fontSize: "0.70rem",
                fontFamily: "Lexend",
              }}
            >
              Adicione pelo menos uma habilidade!
            </span>
          </div>
  )}


                      </div>
                    </div>
                  </div>
                )}

                {!block4 && (
                  <div
                    className="animate flex flex-col"
                    style={{ height: "100%", gap: "5rem" }}
                  >
                    <div
                      className="pd flex flex-col gap-2"
                      style={{ paddingLeft: "4rem", paddingRight: "4rem" }}
                    >
                      <h1 className="PassTit3" style={{ maxWidth: "35ch" }}>
                        Muito bem. Agora adicione algumas informações de contato
                      </h1>
                      <p className="PassPar3Empresa2">
                        Usaremos elas para estabelecer uma conexão com o
                        talento.
                      </p>
                    </div>
                    <div
                      className="pd flex flex-col gap-2"
                      style={{
                        paddingLeft: "4rem",
                        paddingRight: "4rem",
                        marginBottom: "5rem",
                      }}
                    ></div>
                    <div
                      className="flex flex-col gap-2"
                      style={{ marginTop: "-100px" }}
                    >
                      <div
                        className="pd flex flex-col gap-2"
                        style={{ paddingLeft: "4rem", paddingRight: '4rem' }}
                      >
                        <p className="func2">Informações de contato</p>
                        <InputMask
                          mask="(99) 99999-9999"
                          value={telefone}
                          onChange={(e) => setTelefone(e.target.value)}
                        >
                          {(inputProps) => (
                            <input
                              {...inputProps}
                              name="telefone"
                              placeholder="Telefone"
                              type="text"
                              className="lin2"
                              pattern="[0-9]*"
                              style={{ border: `2px solid ${borderTel}`, outline: 'none' }}
                            />
                          )}
                        </InputMask>
                        
                        {textoTel && (
                          <div className="flex gap-1">
                            <img src="icons/icon-erro.svg" alt="" />
                            <span
                              style={{
                                color: "#EF4444",
                                fontSize: "0.70rem",
                                fontFamily: "Lexend",
                              }}
                            >
                              Número de Telefone para continuar!
                            </span>
                          </div>
                        )}

                        <Input
                          type="text"
                          placeholder="Localização"
                          className="lin2"
                          required
                          value={localizacao}
                          onChange={(e) => setLocalizacao(e.target.value)}
                          border = {borderLoca}
                        />

                        {textoLoca && (
                          <div className="flex gap-1">
                            <img src="icons/icon-erro.svg" alt="" />
                            <span
                              style={{
                                color: "#EF4444",
                                fontSize: "0.70rem",
                                fontFamily: "Lexend",
                              }}
                            >
                              Adicione o Endereço para continuar!
                            </span>
                          </div>
                        )}

                      </div>
                    </div>
                  </div>
                )}

                {!block5 && (
                  <div
                    className="animate flex flex-col"
                    style={{ height: "100%", gap: "5rem" }}
                  >
                    <div
                      className="pd flex flex-col gap-2"
                      style={{ paddingLeft: "4rem", paddingRight: "4rem" }}
                    >
                      <h1 className="PassTit4" style={{ maxWidth: "40ch" }}>
                        Ótimo, agora infome o salário da vaga de emprego que
                        você está oferecendo.
                      </h1>
                      <p className="PassPar4">É bom informar ao talento.</p>
                    </div>
                    <div
                      className="pd flex flex-col gap-2"
                      style={{
                        paddingLeft: "4rem",
                        paddingRight: "4rem",
                        marginBottom: "5rem",
                      }}
                    ></div>
                    <div
                      className="flex flex-col gap-2"
                      style={{ marginTop: "-100px" }}
                    >
                      <div
                        className="pd flex flex-col gap-2"
                        style={{ paddingLeft: "4rem" }}
                      >
                        <p className="func">Salário</p>

                        <CurrencyInput
    value={salar}
    onValueChange={handleValueChange}
    decimalSeparator=","
    groupSeparator="."
    prefix="R$ "
    placeholder="Ex: R$ 2.500,00"
    className="lin"
    style={{ border: `2px solid ${borderSalar}`, outline: 'none' }}
  />
                        {texto && (
                                  <div className="flex gap-1">
                                  <img src="icons/icon-erro.svg" alt="" />
                                  <span
                                    style={{
                                      color: "#EF4444",
                                      fontSize: "0.70rem",
                                      fontFamily: "Lexend",
                                    }}
                                  >
                                    Adicione o Salário para continuar!
                                  </span>
                                </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {!block6 && (
                  <div
                    className="animate flex flex-col"
                    style={{ height: "100%", gap: "5rem" }}
                  >
                    <div
                      className="pd flex flex-col gap-2"
                      style={{ paddingLeft: "4rem", paddingRight: "4rem" }}
                    >
                      <h1 className="PassTit3">Detalhes da vaga:</h1>

                      <div className="conteiner-editar flex flex-col gap-3">
                        <span>Titulo</span>
                        <div className="input-editar">
                          <Input
                            type="text"
                            placeholder=""
                            className="lin2edit"
                            required
                            value={profissional}
                            onChange={(e) => setProfissional(e.target.value)}
                            disabled={!isEditable}
                          />
                          <LuPen
                            className="icon-pen"
                            onClick={handlePenClick}
                          />
                        </div>

                        <span>Descrição</span>
                        <div className="input-editar">
                          <textarea
                            placeholder=""
                            className="lin2editarea"
                            required
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                            disabled={!isEditable}
                            rows={4}
                            cols={50}
                            style={{ resize: "none" }}
                          />

                          <LuPen
                            className="icon-pen2"
                            onClick={handlePenClick}
                          />
                        </div>

                        <span>Habilidades</span>
                        <div className="input-editar">
                          <Input
                            type="text"
                            placeholder=""
                            className="lin2edit"
                            required
                            value={selectedOptions}
                            onChange={(e) => setRequisits(e.target.value)}
                            disabled={!isEditable}
                          />
                          <LuPen
                            className="icon-pen"
                            onClick={handlePenClick}
                          />
                        </div>

                        <span>Telefone</span>
                        <div className="input-editar">
                          <InputMask
                            mask="(99) 99999-9999"
                            value={telefone}
                            onChange={(e) => setTelefone(e.target.value)}
                            disabled={!isEditable}
                          >
                            {(inputProps) => (
                              <input
                                {...inputProps}
                                name="telefone"
                                placeholder=""
                                type="text"
                                className="lin2edit"
                                pattern="[0-9]*"
                              />
                            )}
                          </InputMask>

                          <LuPen
                            className="icon-pen"
                            onClick={handlePenClick}
                          />
                        </div>

                        <span>Endereço</span>
                        <div className="input-editar">
                          <Input
                            type="text"
                            placeholder=""
                            className="lin2edit"
                            required
                            value={localizacao}
                            onChange={(e) => setLocalizacao(e.target.value)}
                            disabled={!isEditable}
                          />
                          <LuPen
                            className="icon-pen"
                            onClick={handlePenClick}
                          />
                        </div>

                        <span>Salário</span>
                        <div className="input-editar">
                          <input
                            type="text"
                            value={`R$ ${salar}`} 
                            onChange={handleSalaryChange}
                            placeholder="Ex: R$ 2.500,00"
                            className="lin2edit"
                            pattern="[0-9]*"
                          />
                          <LuPen
                            className="icon-pen"
                            onClick={handlePenClick}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {block && (
                  <div
                    className="flex gap-4 justify-end contProx"
                    style={{
                      marginTop: "100px",
                      width: "100%",
                      paddingLeft: "65px",
                      paddingRight: "65px",
                    }}
                  >
                    <div
                      className="proxEmp order1"
                      style={{ cursor: "pointer" }}
                      onClick={handleClickFalse}
                    >
                      <BtnPrincipal
                        texto="Pular por enquanto"
                        color="#3B82F6"
                        width="200px"
                        back="#fff"
                        hover="#3A61D4"
                        borderRadius="20px"
                        padding="10px"
                        border="#3B82F6"
                        class="btnRespEmp"
                      />
                    </div>

                    <div
                      className="proxEmp order2"
                      style={{ cursor: "pointer" }}
                      onClick={handleClick}
                    >
                      <BtnPrincipal
                        texto="Continuar"
                        color="#fff"
                        width="200px"
                        back="#3B82F6"
                        hover="#3A61D4"
                        borderRadius="20px"
                        padding="10px"
                        border="#3B82F6"
                        class="btnRespEmp"
                      />
                    </div>
                  </div>
                )}
                {!block2 && (
                  <div
                    className="btnProximo"
                    style={{
                      paddingLeft: "4rem",
                      paddingRight: "4rem",
                      marginBottom: "3rem",
                      cursor: "pointer",
                    }}
                    onClick={handleClick2}
                  >
                    <BtnPrincipal
                      texto="Continuar"
                      color="#fff"
                      width="160px"
                      back="#3B82F6"
                      hover="#3A61D4"
                      borderRadius="20px"
                      padding="10px"
                    />
                  </div>
                )}
                {!block3 && (
                  <div
                    className="btnProximo"
                    style={{
                      paddingLeft: "4rem",
                      paddingRight: "4rem",
                      marginBottom: "3rem",
                      cursor: "pointer",
                    }}
                    onClick={handleClick3}
                  >
                    <BtnPrincipal
                      texto="Continuar"
                      color="#fff"
                      width="160px"
                      back="#3B82F6"
                      hover="#3A61D4"
                      borderRadius="20px"
                      padding="10px"
                    />
                  </div>
                )}
                {!block4 && (
                  <div
                    className="btnProximo"
                    style={{
                      paddingLeft: "4rem",
                      paddingRight: "4rem",
                      marginBottom: "3rem",
                      cursor: "pointer",
                    }}
                    onClick={handleClick4}
                  >
                    <BtnPrincipal
                      texto="Continuar"
                      color="#fff"
                      width="160px"
                      back="#3B82F6"
                      hover="#3A61D4"
                      borderRadius="20px"
                      padding="10px"
                    />
                  </div>
                )}
                {!block5 && (
                  <div
                    className="btnProximo"
                    style={{
                      paddingLeft: "4rem",
                      paddingRight: "4rem",
                      marginBottom: "3rem",
                      cursor: "pointer",
                    }}
                    onClick={handleClick5}
                  >
                    <BtnPrincipal
                      texto="Continuar"
                      color="#fff"
                      width="160px"
                      back="#3B82F6"
                      hover="#3A61D4"
                      borderRadius="20px"
                      padding="10px"
                    />
                  </div>
                )}
                {!block6 && (
                  <div
                    className="btnProximo"
                    style={{
                      paddingLeft: "4rem",
                      paddingRight: "4rem",
                      marginBottom: "3rem",
                      cursor: "pointer",
                    }}
                    onClick={handleClick6}
                  >
                    <BtnPrincipal
                      texto="Criar Vaga"
                      color="#fff"
                      width="160px"
                      back="#3B82F6"
                      hover="#3A61D4"
                      borderRadius="20px"
                      padding="10px"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EmpresaPasso;
