import abi from './HathorFederation.json';
import { AbiItem } from 'web3-utils';
import { ContractFactory } from './ContractFactory';
import { IHathorFederation } from './IHathorFederation';
import { IHathorFederationV1 } from './IHathorFederationV1';
import { ConfigChain } from '../lib/configChain';

export class HathorFederationFactory extends ContractFactory {
  public hathorFederationContract: IHathorFederationV1;

  createInstance(configChain?: ConfigChain): IHathorFederation {
    if (!this.hathorFederationContract) {
      const host = configChain?.host ?? process.env.HATHOR_STATE_CONTRACT_HOST_URL;
      const chainId = configChain?.chainId ?? Number.parseInt(process.env.FEDERATION_CHAIN);
      const contractAddress = configChain?.federation ?? process.env.HATHOR_STATE_CONTRACT_ADDR;

      const web3 = this.getWeb3(host);
      const contract = new web3.eth.Contract(abi as AbiItem[], contractAddress);
      this.hathorFederationContract = new IHathorFederationV1(contract, chainId, web3);
    }
    return this.hathorFederationContract;
  }
}
