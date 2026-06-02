import { FAQItem, BonusItem } from "./types";

export const FAQ_LIST: FAQItem[] = [
  {
    id: "faq-8",
    question: "Consigo acessar e editar as artes pelo celular?",
    answer: "Com certeza! Todas as artes você consegue editar tanto no celular quanto no computador sem problema nenhum!"
  },
  {
    id: "faq-1",
    question: "Preciso saber mexer muito no Canva?",
    answer: "Não. Os modelos já estão prontos. Você só precisa editar textos simples, como o nome da sua escolinha, treinos, telefone e cores. É extremamente intuitivo e rápido."
  },
  {
    id: "faq-3",
    question: "Serve para escolinha pequena ou que está começando?",
    answer: "Com certeza. É ideal para quem está iniciando e quer transmitir uma imagem profissional, organizada e de total confiança para os pais dos alunos desde o primeiro dia."
  },
  {
    id: "faq-5",
    question: "Como eu recebo o produto?",
    answer: "O envio é 100% digital e imediato! Assim que seu pagamento for confirmado, você receberá o link para acessar os templates no Canva diretamente no seu WhatsApp e no seu e-mail cadastrado."
  }
];

export const BONUS_LIST: BonusItem[] = [
  {
    id: 1,
    title: "Pack de Stories Prontos",
    description: "Templates de stories prontos para editar, postar e divulgar treinos, matrículas, jogos e avisos da escolinha.",
    originalPrice: 27,
    tag: "BÔNUS #1"
  },
  {
    id: 2,
    title: "Legendas Prontas Para Postar",
    description: "Textos prontos para usar junto com as suas publicações, para você copiar e colar sem precisar ficar travado pensando no que escrever.",
    originalPrice: 17,
    tag: "BÔNUS #2"
  },
  {
    id: 3,
    title: "Capas de Destaque Para Instagram",
    description: "Destaques prontos para deixar o Instagram da escolinha organizado, bonito e com aparência profissional.",
    originalPrice: 27,
    tag: "BÔNUS #3"
  },
  {
    id: 4,
    title: "Checklist de Perfil Profissional",
    description: "Passo a passo para organizar bio, foto, destaques e deixar o perfil pronto para receber pais interessados.",
    originalPrice: 17,
    tag: "BÔNUS #4"
  },
  {
    id: 5,
    title: "Calendário de Conteúdo Para Escolinhas",
    description: "Ideias de postagens para divulgar treinos, matrículas, jogos, campeonatos, resultados e conquistas durante o mês.",
    originalPrice: 27,
    tag: "BÔNUS #5"
  }
];

export const DELIVERABLE_LIST: string[] = [
  "Matrículas abertas",
  "Treinos e horários",
  "Peneiras e seletivas",
  "Jogos e campeonatos",
  "Resultados e conquistas dos alunos",
  "Destaques organizados para perfil",
  "Legendas prontas para copiar e colar",
  "Artes para divulgar no Instagram, Facebook e WhatsApp"
];

export const IS_FOR_YOU_LIST: string[] = [
  "Quer deixar o perfil da escolinha mais bonito e confiável.",
  "Postar com frequência sem precisar criar artes do zero.",
  "Divulgar treinos, matrículas, peneiras, jogos e campeonatos.",
  "Chamar atenção dos pais com posts bonitos e prontos para usar."
];

export const IS_NOT_FOR_YOU_LIST: string[] = [
  "Você quer um curso de marketing com aulas longas.",
  "Você quer contratar uma agência cara de design.",
  "Você não quer postar ou divulgar o trabalho da sua escolinha."
];

