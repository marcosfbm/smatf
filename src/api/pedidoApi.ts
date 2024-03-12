import {AxiosResponse} from 'axios';
/*
import {getUserLocalStorage} from '../context/auth_provider/util';

import {axiosApi} from './axiosApi';
import {ICustomer, ICustomerBackend, parseCustomer, parseCustomerFrontToBack} from './customerApi';
import {ICompany, ICompanyBackend, parseCompanyFrontToBack, parseCompanyBackToFront} from './companyApi';
import {
  IPaymentMethod,
  IPaymentMethodBackend,
  parsePaymentMethodBackToFront,
  parsePaymentMethodFrontToBack,
} from './paymentMethodApi';
import {IPosts, IPostsBackend, parsePostBackToFront} from './postsApi';
import {IProduct, IProductBackend, parseProductBackToFront} from './productApi';
import {parseDateToString, parseStringToDate} from './util';
import {IUser, IUserBackend, parseUserBackToFront, parseUserFrontToBack} from './userApi';
import {
  IRequestType,
  IRequestTypeBackend,
  parseRequestTypeBackToFront,
  parseRequestTypeFrontToBack,
} from './requestTypeApi';
import {axiosApiView} from './axiosApiView';

export interface IRequest {
  id: number,
  userId: number,
  paymentMethodId: number,
  customerId: number,
  withdrawn?: boolean,
  bonus?: boolean,
  items?: number,
  total?: number,
  discount?: number,
  kickback?: number,
  entry?: number,
  surcharge?: number,
  note?: string,
  typedDate: Date,
  sentDate?: Date,
  canceled?: Date,
  billed?: Date | null,
  printed?: string,
  externalId?: string,

  requestGrid: boolean,
  processed?: string | null,
  returned: boolean,
  totalReturned: boolean,
  returnedProcessed?: string | null,
  paid: boolean,
  credit?: number | null,
  points?: number | null,

  cloned?: boolean,
  clonedBy?: string,
  typedBySupervisor?: boolean,
  clonedResquestId?: number,
  requestTypeId?: number,
  requestType?: IRequestType,
  reasonCancellation?: string,
  status?: string,
  customer: ICustomer | null,
  paymentMethod: IPaymentMethod,
  company: ICompany,
  requestItems?: IRequestItems[],
  posts?: IPosts[],
  user: IUser,

  paymentMethodFinalName?: string,
  totalValueFinal?: number,

  urlNF: string | null,
  urlBoleto: string | null,

  jsonPedido: string | null,
  urlPedido: string | null,
  xmlNotaFiscal: string | null,
  jsonBoleto: string | null,
}

export interface IRequestItems {
  id: number,
  quantity: string,
  price: string,
  kickback: number | null,
  onSale: boolean,
  quantityReturned: number | null,
  pruductId: number,
  requestId: number,
  product?: IProduct,
}

export interface IRequestItemsBackend {
  id: number,
  quantidade: string,
  valor: string,
  comissao: number | null,
  promocao: boolean,
  qtd_devolvido: number | null,
  id_produto: number,
  id_pedido_web: number,
  produto?: IProductBackend,
}

export interface IRequestBackend {
  id: number,
  retirado?: boolean,
  bonificacao?: boolean,
  itens?: number,
  total?: number,
  desconto?: number,
  acrescimo?: number,
  comissao?: number,
  entrada?: number,
  observacao?: string,
  motivo_cancelamento?: string,
  digitado_supervisor?: boolean,

  status?: string,
  clonado?: boolean,
  clonado_por?: string,
  id_pedido_clonado?: number,
  digitado: string,
  enviado?: string,
  cancelado?: string,
  impresso?: string,
  faturado?: string | null,
  id_externo?: string,

  pedido_web_grid: boolean,
  processado?: string | null,
  devolvido: boolean,
  devolucao_total: boolean,
  processado_devolucao?: string | null,
  pago: boolean,
  credito?: number | null,
  pontos?: number | null,

  id_forma_pagamento: number,
  formaPagamento: IPaymentMethodBackend,
  id_cliente: number,
  cliente: ICustomerBackend | null,
  id_tipo_pedido?: number,
  tipo_pedido?: IRequestTypeBackend,
  id_usuario: number,
  usuario: IUserBackend,
  empresa: ICompanyBackend,
  pedidoWebItem?: IRequestItemsBackend[],
  mensagemWeb?: IPostsBackend[],

  forma_pagamento_externo?: string,
  total_acerto?: number,

  url_nota_fiscal: string | null,
  url_boleto: string | null,

  json_pedido: string | null,
  url_pedido: string | null,
  xml_nota_fiscal: string | null,
  json_boleto: string | null,
}

export interface IRequestCreate {
  companyId: number,
  userId: number,
  paymentMethodId: number,
  clientId: number,
  withdrawn?: boolean,
  bonificacao?: boolean,
  bonus?: boolean,
  total?: number,

  items?: number,
  discount?: number,
  kickback?: number,
  entry?: number,
  surcharge?: number,
  note?: string,
  typedDate: Date,
  sentDate?: Date,
  canceled?: Date,
  billed?: Date | null,
  printed?: string,
  externalId?: string,

  requestGrid: boolean,
  processed?: string | null,
  returned: boolean,
  totalReturned: boolean,
  returnedProcessed?: string | null,
  paid: boolean,
  credit?: number | null,
  points?: number | null,
  cloned?: boolean,
  clonedBy?: string,
  typedBySupervisor?: boolean,
  clonedResquestId?: number,
  requestTypeId?: number,
  reasonCancellation?: string,
  status?: string,

  itens?: { productId: number, quantity: number, valor_venda: number }[],
}

export interface IRequestCreateBackend {
  id_empresa: number,
  id_usuario: number,
  id_forma_pagamento: number,
  id_cliente: number,
  retirado?: boolean,
  bonificacao?: boolean,
  itens?: { id_produto: number, quantidade: number, valor_venda: number }[],
  total?: number,
  desconto?: number,
  comissao?: number,
  entrada?: number,
  observacao?: string,
  digitado?: Date,
  enviado?: Date,
  cancelado?: Date,
  faturado?: string,
  impresso?: Date,
  id_externo?: string,
  acrescimo?: number,
  clonado?: boolean,
  clonado_por?: string,
  digitado_supervisor?: boolean,
  id_pedido_clonado?: number,
  id_tipo_pedido?: number,
  motivo_cancelamento?: string,
  status?: string,

  pedido_web_grid: boolean,
  processado?: Date,
  devolvido?: boolean,
  devolucao_total?: boolean,
  processado_devolucao?: Date,
  pago?: boolean,
  credito?: number,
  pontos?: number,
}

export interface INewRequestGridCart {
  productId: number,
  productName: string,
  unit: string,
  information: string | null,
  url_image: string | null,
  saleValue: number | null,
  quantity: number,
  inventoryControl: boolean,
  inventory: number | null,
  onSale: boolean,
  kickback: number | null,
  categoryName?: string | null,
  ref?: string | null,
  quantityReturned?: number | null,
}

export interface INewRequestGridConclude {
  paymentMethodId: number,
  customerId: number,
  note: string,
  surcharge: number,
  discount: number,
  entry: number,
  requestTypeId: number,
  bloquear: boolean,
  retirado: boolean,
  bonificacao: boolean,
}

export interface IRequestClientList {
  customer: ICustomer,
  lastRequestDate: Date | null,
  totalLastRequest: number,
}

export interface IRequestClientListBackend {
  cliente: ICustomerBackend,
  digitado: string | null,
  total: number,
}

const parseClientListBackToFront = (dataBack: IRequestClientListBackend): IRequestClientList => ({
  customer: parseCustomer(dataBack.cliente),
  lastRequestDate: dataBack.digitado ? parseStringToDate(dataBack.digitado) : null,
  totalLastRequest: dataBack.total,
});

interface IRequestList {
  options: IRequest[],
  hasMore: boolean,
}

interface IRequestListBackend {
  options: IRequestBackend[],
  hasMore: boolean,
}

interface IRequestListTotal {
  itensTotal: string,
  valueTotal: string,
}

interface IRequestListTotalBackend {
  _sum: {
    itens: string,
    total: string
  }
}

const parseListTotal = (dataBack: IRequestListTotalBackend): IRequestListTotal => ({
  itensTotal: dataBack._sum.itens,
  valueTotal: dataBack._sum.total,
});

const parseListBackToFront = (dataBack: IRequestListBackend): IRequestList => ({
  options: dataBack.options.map((item) => parseRequestBackToFront(item)),
  hasMore: dataBack.hasMore,
});

const parseResquesItemsBackToFront = (data: IRequestItemsBackend): IRequestItems => ({
  id: data.id,
  quantity: data.quantidade,
  price: data.valor,
  pruductId: data.id_produto,
  requestId: data.id_pedido_web,
  product: data.produto ? parseProductBackToFront(data.produto) : undefined,
  kickback: data.comissao,
  onSale: data.promocao,
  quantityReturned: data.qtd_devolvido,
});

export const parseRequestBackToFront = (dataBackend: IRequestBackend): IRequest => ({
  id: dataBackend.id,
  userId: dataBackend.id_usuario,
  paymentMethodId: dataBackend.id_forma_pagamento,
  customerId: dataBackend.id_cliente,
  withdrawn: dataBackend.retirado,
  bonus: dataBackend.bonificacao,
  items: dataBackend.itens,
  total: dataBackend.total,
  discount: dataBackend.desconto,
  kickback: dataBackend.comissao,
  entry: dataBackend.entrada,
  note: dataBackend.observacao,
  typedDate: parseStringToDate(dataBackend.digitado),
  sentDate: dataBackend.enviado ? parseStringToDate(dataBackend.enviado) : undefined,
  canceled: dataBackend.cancelado ? parseStringToDate(dataBackend.cancelado) : undefined,
  billed: dataBackend.faturado ? parseStringToDate(dataBackend.faturado) : undefined,
  printed: dataBackend.impresso,
  externalId: dataBackend.id_externo,

  requestGrid: dataBackend.pedido_web_grid,
  processed: dataBackend.processado,
  returned: dataBackend.devolvido,
  totalReturned: dataBackend.devolucao_total,
  returnedProcessed: dataBackend.processado_devolucao,
  paid: dataBackend.pago,
  credit: dataBackend.credito,
  points: dataBackend.pontos,

  surcharge: dataBackend.acrescimo,
  cloned: dataBackend.clonado,
  clonedBy: dataBackend.clonado_por,
  typedBySupervisor: dataBackend.digitado_supervisor,
  clonedResquestId: dataBackend.id_pedido_clonado,
  requestTypeId: dataBackend.id_tipo_pedido,
  requestType: dataBackend.tipo_pedido ? parseRequestTypeBackToFront(dataBackend.tipo_pedido) : undefined,

  reasonCancellation: dataBackend.motivo_cancelamento,
  status: dataBackend.status,
  customer: dataBackend.cliente ? parseCustomer(dataBackend.cliente) : null,
  paymentMethod: parsePaymentMethodBackToFront(dataBackend.formaPagamento),
  company: parseCompanyBackToFront(dataBackend.empresa),
  requestItems: dataBackend.pedidoWebItem?.map((data) => parseResquesItemsBackToFront(data)),
  posts: dataBackend.mensagemWeb?.map((data) => parsePostBackToFront(data)),
  user: parseUserBackToFront(dataBackend.usuario),

  totalValueFinal: dataBackend.total_acerto,
  paymentMethodFinalName: dataBackend.forma_pagamento_externo,

  urlNF: dataBackend.url_nota_fiscal,
  urlBoleto: dataBackend.url_boleto,
  jsonPedido: dataBackend.json_pedido,
  urlPedido: dataBackend.url_pedido,
  xmlNotaFiscal: dataBackend.xml_nota_fiscal,
  jsonBoleto: dataBackend.json_boleto,
});

export const parseRequestFrontToBack = (dataFront: IRequest): IRequestBackend => ({
  id: dataFront.id,
  id_usuario: dataFront.userId,
  id_forma_pagamento: dataFront.paymentMethodId,
  id_cliente: dataFront.customerId,
  retirado: dataFront.withdrawn,
  bonificacao: dataFront.bonus,
  itens: dataFront.items,
  total: dataFront.total,
  desconto: dataFront.discount,
  comissao: dataFront.kickback,
  entrada: dataFront.entry,
  observacao: dataFront.note,
  digitado: parseDateToString(dataFront.typedDate),
  enviado: dataFront.sentDate ? parseDateToString(dataFront.sentDate) : undefined,
  cancelado: dataFront.canceled ? parseDateToString(dataFront.canceled) : undefined,
  impresso: dataFront.printed,
  id_externo: dataFront.externalId,

  pedido_web_grid: dataFront.requestGrid,
  processado: dataFront.processed,
  devolvido: dataFront.returned,
  devolucao_total: dataFront.totalReturned,
  processado_devolucao: dataFront.returnedProcessed,
  pago: dataFront.paid,
  credito: dataFront.credit,
  pontos: dataFront.points,

  acrescimo: dataFront.surcharge,
  clonado: dataFront.cloned,
  clonado_por: dataFront.clonedBy,
  digitado_supervisor: dataFront.typedBySupervisor,
  id_pedido_clonado: dataFront.clonedResquestId,
  id_tipo_pedido: dataFront.requestTypeId,
  tipo_pedido: dataFront.requestType ? parseRequestTypeFrontToBack(dataFront.requestType) : undefined,
  motivo_cancelamento: dataFront.reasonCancellation,
  status: dataFront.status,
  empresa: parseCompanyFrontToBack(dataFront.company),
  cliente: dataFront.customer ? parseCustomerFrontToBack(dataFront.customer) : null,
  formaPagamento: parsePaymentMethodFrontToBack(dataFront.paymentMethod),
  usuario: parseUserFrontToBack(dataFront.user),

  url_nota_fiscal: dataFront.urlNF,
  url_boleto: dataFront.urlBoleto,

  json_pedido: dataFront.jsonPedido,
  url_pedido: dataFront.urlPedido,
  xml_nota_fiscal: dataFront.xmlNotaFiscal,
  json_boleto: dataFront.jsonBoleto,
});

export const requestListApi = async (
    offset: number,
    apenasPendentes?: boolean,
): Promise<IRequestList> => {
  const user = await getUserLocalStorage();
  const result: AxiosResponse<IRequestListBackend> = await axiosApi.get(
      'pedidoWeb',
      {params: {
        id_empresa: user?.id_empresa ? user.id_empresa : 0,
        id_supervisor: user?.id_supervisor ? user?.id_supervisor : undefined,
        id_vendedor: user?.id_vendedor ? user?.id : undefined,
        apenas_pendentes: apenasPendentes,
        offset,
      }},
  );

  return parseListBackToFront(result.data);
};

export const getRequestById = async (id: number): Promise<IRequest> => {
  const result: AxiosResponse<IRequestBackend> = await axiosApi.get(
      'pedidoWeb/getById',
      {params: {id}},
  );

  return parseRequestBackToFront(result.data);
};

export const requestCancelApi = async (id: number, motivation: string): Promise<void> => {
  await axiosApi.put('pedidoWeb/cancelar', {id, motivo_cancelamento: motivation});
};

export const requestSendApi = async (id: number): Promise<void> => {
  await axiosApi.put('pedidoWeb/enviar', {id});
};

export const requestSendAllApi = async (idUser: number): Promise<void> => {
  await axiosApi.put('pedidoWeb/enviartodos', {idUser});
};

export const buscarArquivoApi = async (url: string): Promise<AxiosResponse<Blob>> => {
  const result: AxiosResponse<Blob> = await axiosApi.get(
      'pedidoWeb/recuperararquivo',
      {params: {nome_arquivo: url}},
  );

  return result;
};

export const buscarPedidoApiView = async (dados: string): Promise<AxiosResponse<Blob>> => {
  // console.log('API RES: ' + dados);
  const result: AxiosResponse<Blob> = await axiosApiView.post(
      'pedido-report/2', dados, {
        responseType: 'arraybuffer',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/pdf',
        },
      });
  return result;
};

export const buscarBoletoApiView = async (dados: string): Promise<AxiosResponse<Blob>> => {
  // console.log('API RES: ' + dados);
  const result: AxiosResponse<Blob> = await axiosApiView.post(
      'pedido-report/barcode/' + dados);
  return result;
};

export const newRequestCreateApi = async (
    values: INewRequestGridConclude,
    calculatedKickback: number,
    totalValue: number,
    cartProducts: INewRequestGridCart[],
    userId: number,
    requestGrid: boolean,
): Promise<void> => {
  const user = await getUserLocalStorage();

  await axiosApi.post(
      'pedidoWeb',
      {
        id_empresa: user?.id_empresa ? user?.id_empresa : 0,
        id_usuario: userId,
        id_forma_pagamento: values.paymentMethodId,
        id_cliente: values.customerId,
        id_tipo_pedido: values.requestTypeId,
        retirado: values.retirado,
        bonificacao: values.bonificacao,
        itens: cartProducts.map((item) => ({
          id_produto: item.productId,
          quantidade: item.quantity,
          valor_venda: (item.saleValue || 0) * item.quantity,
          comissao: item.kickback,
          promocao: item.onSale,
        })),
        total: totalValue,
        desconto: values.discount,
        comissao: calculatedKickback,
        entrada: values.entry,
        observacao: values.note,
        acrescimo: values.surcharge,
        digitado_supervisor: user?.id_supervisor ? true : false,
        status: 'Pendente',
        pedido_web_grid: requestGrid,
      },
  );
};

export const newRequestUpdateApi = async (
    id: number,
    values: INewRequestGridConclude,
    addition: number,
    calculatedKickback: number,
    totalValue: number,
    cartProducts: INewRequestGridCart[],
    userId: number,
): Promise<void> => {
  const user = await getUserLocalStorage();
  await axiosApi.put(
      'pedidoWeb/editar',
      {
        id,
        id_usuario: userId,
        id_forma_pagamento: values.paymentMethodId,
        id_cliente: values.customerId,
        id_tipo_pedido: values.requestTypeId,
        retirado: false,
        bonificacao: true,
        itens: cartProducts.map((item) => ({
          id_produto: item.productId,
          quantidade: item.quantity,
          valor_venda: Number(item.saleValue) * item.quantity,
          comissao: item.kickback,
          promocao: item.onSale,
          qtd_devolucao: item.quantityReturned,
        })),
        total: totalValue,
        desconto: values.discount,
        comissao: calculatedKickback,
        entrada: values.entry,
        observacao: values.note,
        acrescimo: addition,
        digitado_supervisor: user?.id_supervisor ? true : false,
        status: 'Pendente',
        id_empresa: user?.id_empresa ? user?.id_empresa : 0,
      },
  );
};

export const requestUpdateApi = async (
    values: IRequest,
): Promise<void> => {
  await axiosApi.put(
      'pedidoWeb/devolucao',
      {
        id: values.id,
        itens: values.requestItems?.map((item) => ({
          id: item.id,
          quantidade: item.quantity,
          qtd_devolucao: item.quantityReturned,
          valor_venda: Number(item.price) * (Number(item.quantity) - (item.quantityReturned || 0)),
        })),
        total: values.total,
        desconto: values.discount,
        comissao: values.kickback,
        acrescimo: values.surcharge,
        devolvido: true,
        devolucao_total: values.totalReturned,
      },
  );
};

export const newRequestCloneApi = async (
    id: number,
    values: INewRequestGridConclude,
    calculatedKickback: number,
    totalValue: number,
    cartProducts: INewRequestGridCart[],
    userId: number,
): Promise<void> => {
  const user = await getUserLocalStorage();
  await axiosApi.post(
      'pedidoWeb',
      {
        id_pedido_clonado: id,
        id_usuario: userId,
        id_forma_pagamento: values.paymentMethodId,
        id_cliente: values.customerId,
        id_tipo_pedido: values.requestTypeId,
        retirado: false,
        bonificacao: true,
        itens: cartProducts.map((item) => ({
          id_produto: item.productId,
          quantidade: item.quantity,
          valor_venda: item.saleValue,
          comissao: item.kickback,
          promocao: item.onSale,
        })),
        total: totalValue,
        desconto: values.discount,
        comissao: calculatedKickback,
        entrada: values.entry,
        observacao: values.note,
        acrescimo: values.surcharge,
        digitado_supervisor: user?.id_supervisor ? true : false,
        status: 'Pendente',
        clonado: true,
        clonado_por: user?.nome || '',
        id_empresa: user?.id_empresa || 0,
      },
  );
};

export const requestDashboardListApi = async (
    data: Date,
    tipoDataFiltro: string,
): Promise<IRequest[]> => {
  const user = await getUserLocalStorage();
  const result: AxiosResponse<IRequestBackend[]> = await axiosApi.get(
      'pedidoWeb/dashboard',
      {params: {
        data_envio: tipoDataFiltro === 'dataEnvio' ? data : undefined,
        data_faturamento: tipoDataFiltro === 'dataFaturamento' ? data : undefined,
        id_empresa: user?.id_empresa ? user.id_empresa : 0,
        id_supervisor: user?.id_supervisor ? user?.id : undefined,
        id_vendedor: user?.id_vendedor ? user?.id : undefined,
      }},
  );

  return result.data.map((item) => parseRequestBackToFront(item));
};

export const getTotaisList = async (
    idCustomer?: number,
    idPaymentMethod?: number,
    idSeller?: number,
    status?: string,
    requestDate?: Date,
    campanha?: string,
): Promise<IRequestListTotal> => {
  const user = await getUserLocalStorage();
  const result: AxiosResponse<IRequestListTotalBackend> = await axiosApi.get(
      'pedidoWeb/gettotais',
      {params: {
        id_forma_pagamento: idPaymentMethod && idPaymentMethod > 0 ? idPaymentMethod : undefined,
        id_cliente: idCustomer && idCustomer > 0 ? idCustomer : undefined,
        id_empresa: user?.id_empresa ? user.id_empresa : 0,
        id_supervisor: user?.id_supervisor && (!idSeller || idSeller < 0) ? user?.id_supervisor : undefined,
        id_vendedor: user?.id_vendedor ? user?.id : undefined,
        status: status && status !== 'Todos' ? status : undefined,
        digitado: requestDate ? parseDateToString(requestDate) : undefined,
        campanha,
      }},
  );

  return parseListTotal(result.data);
};

export const requestClientsListApi = async (
    isPositivado: boolean,
    isTodos: boolean,
    campanha?: string,
    idSeller?: number,
): Promise<IRequestClientList[]> => {
  if (isTodos) {
    campanha = undefined;
  }
  const user = await getUserLocalStorage();
  const result: AxiosResponse<IRequestClientListBackend[]> = await axiosApi.get(
      'cliente/listarporvendedor',
      {params: {
        id_empresa: user?.id_empresa ? user.id_empresa : 0,
        id_supervisor: user?.id_supervisor && (!idSeller || idSeller < 0) ? user?.id_supervisor : undefined,
        id_usuario: user?.id ? user?.id : undefined,
        id_vendedor: user?.id_vendedor ? user?.id_vendedor : undefined,
        positivado: isPositivado,
        campanha,
      }},
  );

  return result.data.map((item) => parseClientListBackToFront(item));
};*/
