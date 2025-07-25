const ADDRESSES = require('../helper/coreAssets.json')
const { sumTokens2, } = require('../helper/unwrapLPs')
const { getLogs } = require('../helper/cache/getLogs')

const COMPOUND_ORACLE_NAME = 'CompoundV3PositionOracle'
const AAVE_ORACLE_NAME = 'AaveV3PositionOracle'
const LLAMAPAY_ROUTER_ORACLE_NAME = 'LlamaPayRouterOracle'
const GEARBOX_TOKEN_PREFIX = 'Farming of'
const ARRAKIS_TOKEN_PREFIX = 'Arrakis Vault V2'
const ESXAI_POSITION_ORACLE_NAME = 'EsXai Position Oracle'
const SYMBIOTIC_TOKEN_PREFIX = 'Symbiotic Vault'
const MORPHO_BLUE_POSITION_ORACLE_NAME = 'MorphoBluePositionOracle'
const MORPHO_ERC4626_ASSETS = [
  '0xd9a442856c234a39a81a089c06451ebaa4306a72',
  '0x9d60947d49911e3c262c108f97fe07cde209f9a7'
]

const config = {
  polygon: {
    aavePool: '0x794a61358D6845594F94dc1DB02A252b5b4814aD',
    aavePoolDataProvider: '0x69FA688f1Dc47d4B5d8029D5a35FB7a548310654',
    morphoBlue: '0x1bF0c2541F820E775182832f06c0B7Fc27A25f67',
    comets: [
      {
        address: '0xF25212E676D1F7F89Cd72fFEe66158f541246445',
        baseToken: ADDRESSES.polygon.USDC
      }
    ],
    cometReward: '0x45939657d1CA34A8FA39A924B71D28Fe8431e581',
    arrakisHelper: '0x89E4bE1F999E3a58D16096FBe405Fc2a1d7F07D6',
    vaultFactories: [
      {
        address: "0xfa6295a04f99815e8fa65240ed2cf9ad383c50ba",
        fromBlock: 42027977
      },
      {
        address: "0x3c14801dc6402e0560d69083f2b238b4c4b4dafe",
        fromBlock: 42835719
      },
      {
        address: "0x49b428ea1cd536e7d103e9729ea14400785e30ec",
        fromBlock: 54062542
      },
      {
        address: "0xa1c908cf7371047649dfca9ece01327dc6db3094",
        fromBlock: 48024333
      }
    ]
  },
  ethereum: {
    aavePool: '0x87870Bca3F3fD6335C3F4ce8392D69350B4fA4E2',
    aavePoolDataProvider: '0x7B4EB56E7CD4b454BA8ff71E4518426369a138a3',
    morphoBlue: '0xBBBBBbbBBb9cC5e90e3b3Af64bdAF62C37EEFFCb',
    comets: [
      {
        address: '0xA17581A9E3356d9A858b789D68B4d866e593aE94',
        baseToken: ADDRESSES.ethereum.WETH
      },
      {
        address: '0xc3d688B66703497DAA19211EEdff47f25384cdc3',
        baseToken: ADDRESSES.ethereum.USDC
      }
    ],
    cometReward: '0x1B0e765F6224C21223AeA2af16c1C46E38885a40',
    arrakisHelper: '0x89E4bE1F999E3a58D16096FBe405Fc2a1d7F07D6',
    vaultFactories: [
      {
        address: "0x8a7c03e9f037ba096f1fa8b48bfd65c7578327c9",
        fromBlock: 17642780
      },
      {
        address: "0xbebb92ed09688e64dc38c240b600d0b1d504ee56",
        fromBlock: 17694550
      },
      {
        address: "0x6b8d4485e11aae228a32FAe5802c6d4BA25EA404",
        fromBlock: 18143506
      },
      {
        address: "0x9500948c2BEeeB2Da4CC3aA21CB05Bd2e7C27191",
        fromBlock: 18192390
      },
      {
        address: "0x38896b4ac8420b8A2B768001Da44d11109F1797D",
        fromBlock: 18737324
      }
    ]
  },
  arbitrum: {
    aavePool: '0x794a61358D6845594F94dc1DB02A252b5b4814aD',
    aavePoolDataProvider: '0x6b4E260b765B3cA1514e618C0215A6B7839fF93e',
    morphoBlue: '0x6c247b1F6182318877311737BaC0844bAa518F5e',
    comets: [
      {
        address: '0xA5EDBDD9646f8dFF606d7448e414884C7d905dCA',
        baseToken: ADDRESSES.arbitrum.USDC,
      },
      {
        address: '0x9c4ec768c28520B50860ea7a15bd7213a9fF58bf',
        baseToken: ADDRESSES.arbitrum.USDC_CIRCLE,
      },
    ],
    cometReward: '0x88730d254A2f7e6AC8388c3198aFd694bA9f7fae',
    arrakisHelper: '0x89E4bE1F999E3a58D16096FBe405Fc2a1d7F07D6',
    esXaiPoolFactory: '0xF9E08660223E2dbb1c0b28c82942aB6B5E38b8E5',
    xai: '0x4Cb9a7AE498CEDcBb5EAe9f25736aE7d428C9D66',
    esXai: '0x4C749d097832DE2FEcc989ce18fDc5f1BD76700c',
    vaultFactories: [
      {
        address: "0xaF2762E1F75DeCdb8d240576e7A2CEc1A365cD46",
        fromBlock: 203397910
      },
      {
        address: '0x49b428ea1cd536e7d103e9729ea14400785e30ec',
        fromBlock: 245595750
      }
    ]
  },
  base: {
    aavePool: '0xA238Dd80C259a72e81d7e4664a9801593F98d1c5',
    aavePoolDataProvider: '0x2d8A3C5677189723C4cB8873CfC9C8976FDF38Ac',
    morphoBlue: '0xBBBBBbbBBb9cC5e90e3b3Af64bdAF62C37EEFFCb',
    comets: [
      {
        address: '0x46e6b214b524310239732D51387075E0e70970bf',
        baseToken: ADDRESSES.optimism.WETH_1,
      },
      {
        address: '0xb125E6687d4313864e53df431d5425969c15Eb2F',
        baseToken: ADDRESSES.base.USDC,
      },
      {
        address: '0x9c4ec768c28520B50860ea7a15bd7213a9fF58bf',
        baseToken: ADDRESSES.base.USDbC,
      },
    ],
    cometReward: '0x123964802e6ABabBE1Bc9547D72Ef1B69B00A6b1',
    arrakisHelper: '0x89E4bE1F999E3a58D16096FBe405Fc2a1d7F07D6',
    vaultFactories: [
      {
        address: "0x5CD0Cb0DcDEF98a8d07a8D44054a13F2c35C53E1",
        fromBlock: 13582859
      },
      {
        address: "0x1395C314782bba704ca984ad41e57275f6E77b09",
        fromBlock: 23294637
      }
    ]
  },
}

module.exports.methodology = 'Counts tokens held directly in vaults, as well as all managed DeFi positions.'
module.exports.start = 1682619377

Object.keys(config).forEach(chain => {
  module.exports[chain] = {
    tvl: async (api) => {
      const AAVE_POOL = config[chain].aavePool
      const AAVE_POOL_DATA_PROVIDER = config[chain].aavePoolDataProvider
      const MORPHO_BLUE = config[chain].morphoBlue
      const COMETS = config[chain].comets
      const COMET_REWARD = config[chain].cometReward
      const ARRAKIS_HELPER = config[chain].arrakisHelper
      const vaultFactories = config[chain].vaultFactories
      const ESXAI_POOL_FACTORY = config[chain].esXaiPoolFactory
      const XAI = config[chain].xai
      const ESXAI = config[chain].esXai

      const vaultCreateds = []
      for (const { address, fromBlock } of vaultFactories) {
        const logs = await getLogs({
          api,
          target: address,
          topic: 'VaultCreated(address indexed,address,address, address indexed, address indexed, address, uint256, string, address)',
          eventAbi: 'event VaultCreated(address indexed vault, address assetRegistry, address hooks, address indexed owner, address indexed guardian, address feeRecipient, uint256 fee, string description, address wrappedNativeToken)',
          onlyArgs: true,
          fromBlock,
        })
        vaultCreateds.push(...logs.map(x => ({ vault: x.vault, assetRegistry: x.assetRegistry })))
      }

      const vaults = []
      const assetRegistries = []
      vaultCreateds.forEach(x => {
        vaults.push(x.vault)
        assetRegistries.push(x.assetRegistry)
      })

      const assets = await api.multiCall({ abi: abi.assets, calls: assetRegistries })
      const uniqueAssets = [...new Set(assets.flatMap(x => x.map(y => y.asset)))]
      const assetNames = await api.multiCall({ abi: 'string:name', calls: uniqueAssets, permitFailure: true })

      const erc4626sAndOwners = []
      const tokensAndOwners = []

      const erc4626UnderylingMap = {}
      const aaveVaults = []
      const compoundVaults = []
      const llamapayRouters = []
      const gearboxFarmingPools = []
      const arrakisVaults = []
      const xaiPositionVaults = []
      const esXaiVaults = []
      const symbioticVaults = []
      const morphoBlueVaults = []
      for (let i = 0; i < vaults.length; ++i) {
        const vault = vaults[i]
        for (let j = 0; j < assets[i].length; ++j) {
          const assetInfo = assets[i][j]

          const assetName = assetNames[uniqueAssets.findIndex(x => x === assetInfo.asset)]
          if (assetName) {
            if (assetName === COMPOUND_ORACLE_NAME) {
              compoundVaults.push(vault)
              continue
            }
            if (assetName === AAVE_ORACLE_NAME) {
              aaveVaults.push(vault)
              continue
            }
            if (assetName === LLAMAPAY_ROUTER_ORACLE_NAME) {
              llamapayRouters.push(assetInfo.asset)
              continue
            }
            if (assetName.startsWith(GEARBOX_TOKEN_PREFIX)) {
              gearboxFarmingPools.push([vault, assetInfo.asset])
              continue
            }
            if (assetName.startsWith(ARRAKIS_TOKEN_PREFIX)) {
              arrakisVaults.push(assetInfo.asset)
              continue
            }
            if (assetName === ESXAI_POSITION_ORACLE_NAME) {
              xaiPositionVaults.push(vault)
              continue
            }
            if (assetName.startsWith(SYMBIOTIC_TOKEN_PREFIX)) {
              symbioticVaults.push([vault, assetInfo.asset])
              continue
            }
            if (assetName === MORPHO_BLUE_POSITION_ORACLE_NAME) {
              morphoBlueVaults.push([vault, assetInfo.asset])
              continue
            }
          }


          if (ESXAI && assetInfo.asset.toLowerCase() === ESXAI.toLowerCase()) {
            esXaiVaults.push(vault)
            continue
          }


          if (assetInfo.isERC4626) {
            if (!erc4626UnderylingMap[assetInfo.asset]) erc4626UnderylingMap[assetInfo.asset] = null
            erc4626sAndOwners.push([assetInfo.asset, vault])
          } else {
            tokensAndOwners.push([assetInfo.asset, vault])
          }
        }
      }

      const [underlyingTokens, vaultErc4626Balances, esXaiVaultBalances] = await Promise.all([
        api.multiCall({ abi: 'address:asset', calls: Object.keys(erc4626UnderylingMap) }),
        api.multiCall({ abi: 'erc20:balanceOf', calls: erc4626sAndOwners.map(x => ({ target: x[0], params: x[1] })) }),
        api.multiCall({ abi: 'erc20:balanceOf', calls: esXaiVaults.map(x => ({target: ESXAI, params: [x]}))})
      ])

      esXaiVaultBalances.forEach(x => {
        api.addToken(XAI, x)
      })

      await Promise.all([
        processAaveTvl(aaveVaults, api, AAVE_POOL, AAVE_POOL_DATA_PROVIDER),
        processCompoundTvl(compoundVaults, api, COMETS, vaults, COMET_REWARD),
        processLlamaPayTvl(llamapayRouters, api),
        processGearboxTvl(gearboxFarmingPools, api),
        processArrakisTvl(arrakisVaults, api, ARRAKIS_HELPER),
        processXaiTvl(xaiPositionVaults, api, ESXAI_POOL_FACTORY, XAI),
        processSymbioticTvl(symbioticVaults, api),
        processMorphoBlueTvl(morphoBlueVaults, api, MORPHO_BLUE)
      ])

      Object.keys(erc4626UnderylingMap).forEach((erc4626Asset, i) => erc4626UnderylingMap[erc4626Asset] = underlyingTokens[i])

      const vaultConvertToAssets = await api.multiCall({ abi: abi.convertToAssets, calls: erc4626sAndOwners.map((x, i) => ({ target: x[0], params: vaultErc4626Balances[i] })) })

      erc4626sAndOwners.forEach(([token,], i) => {
        const underlyingToken = erc4626UnderylingMap[token]
        api.add(underlyingToken, vaultConvertToAssets[i])
      })

      return sumTokens2({ api, tokensAndOwners })
    }
  }
})

async function processXaiTvl(xaiPositionVaults, api, ESXAI_POOL_FACTORY, XAI) {
  if (xaiPositionVaults.length === 0) return

  const pools = await api.multiCall({ abi: abi.getPoolIndicesOfUser, calls: xaiPositionVaults.map(x => ({target: ESXAI_POOL_FACTORY, params: [x]}))})
  const vaultPools = xaiPositionVaults.flatMap((vault, i) => pools[i].map(pool => ([vault, pool])))

  const [bucketTrackers, stakedAmounts] = await Promise.all([
    api.multiCall({ abi: abi.esXaiStakeBucket, calls: vaultPools.map(x => x[1]) }),
    api.multiCall({ abi: abi.getStakedAmounts, calls: vaultPools.map(x => ({target: x[1], params: [x[0]]}))})
  ])

  stakedAmounts.forEach(x => {
    api.addToken(XAI, x)
  })

  const bucketWithdrawables = await api.multiCall({ abi: abi.withdrawableDividendOf, calls: vaultPools.map((x, i) => ({target: bucketTrackers[i], params: [x[0]]}))})

  bucketWithdrawables.forEach(x => {
    api.addToken(XAI, x)
  })
}

async function processArrakisTvl(arrakisVaults, api, arrakisHelper) {
  if (arrakisVaults.length === 0) return

  const [tokens0, tokens1, totalUnderlyings] = await Promise.all([
    api.multiCall({ abi: abi.token0, calls: arrakisVaults}),
    api.multiCall({ abi: abi.token1, calls: arrakisVaults}),
    api.multiCall({ abi: abi.totalUnderlying, calls: arrakisVaults.map(x => ({target: arrakisHelper, params: [x]}))})
  ])

  totalUnderlyings.forEach((v, i) => {
    api.addToken(tokens0[i], v.totalAmount0)
    api.addToken(tokens1[i], v.totalAmount1)
  })
}

async function processGearboxTvl(farmingPools, api) {
  if (farmingPools.length === 0) return

  const [stakingTokens, stakingTokenBalances, rewardTokens, farmed]  = await Promise.all([
    api.multiCall({ abi: abi.stakingToken, calls: farmingPools.map(x => x[1])}),
    api.multiCall({ abi: 'erc20:balanceOf', calls: farmingPools.map(x => ({target: x[1], params:[x[0]]}))}),
    api.multiCall({ abi: abi.rewardsToken, calls: farmingPools.map(x => x[1])}),
    api.multiCall({ abi: abi.farmed, calls: farmingPools.map(x => ({target: x[1], params: [x[0]]}))})
  ])

  const [underlyingTokens, underlyingBalances] = await Promise.all([
    api.multiCall({ abi: 'address:asset', calls: stakingTokens}),
    api.multiCall({ abi: abi.convertToAssets, calls: stakingTokens.map((x, i) => ({target: x, params: [stakingTokenBalances[i]]}))})
  ])

  rewardTokens.forEach((rewardToken, i) => {
    api.addToken(rewardToken, farmed[i])
  })
  underlyingTokens.forEach((underlyingToken, i) => {
    api.addToken(underlyingToken, underlyingBalances[i])
  })
}

async function processLlamaPayTvl(llamaPayRouters, api) {
  if (llamaPayRouters.length === 0) return

  const llamaPayInfos = await api.multiCall({ abi: abi.llamaPayInfoList, calls: llamaPayRouters.map(x => ({target: x})) })

  const [llamaPayTokens, decimalDivisors, llamaPayBalances] = await Promise.all([
    api.multiCall({abi: abi.token, calls: llamaPayInfos.flatMap(x => x.map(y => y[0]))}),
    api.multiCall({abi: abi.DECIMALS_DIVISOR, calls: llamaPayInfos.flatMap(x => x.map(y => y[0]))}),
    api.multiCall({abi: abi.balances, calls: llamaPayInfos.flatMap((v, i) => v.map(y => ({target: y[0], params:[llamaPayRouters[i]]})))})
  ])

  llamaPayTokens.forEach((token, i) => {
    api.addToken(token, BigInt(llamaPayBalances[i]) / BigInt(decimalDivisors[i]))
  })
}

async function processCompoundTvl(compoundVaults, api, COMETS, vaults, COMET_REWARD) {
  if (compoundVaults.length === 0 || !COMETS || !COMET_REWARD) return

  const numAssets = await api.multiCall({ abi: 'uint8:numAssets', calls: COMETS.map(x => x.address) });


  const collateralCalls = [];
  COMETS.forEach((comet, i) => [...Array(parseInt(numAssets[i])).keys()].forEach(assetIndex => collateralCalls.push({ target: comet.address, params: assetIndex })));
  const balanceOfCalls = [];
  vaults.forEach(vault => COMETS.forEach(comet => balanceOfCalls.push({ target: comet.address, params: vault, baseToken: comet.baseToken })));
  const rewardOwedCalls = [];
  vaults.forEach(vault => COMETS.forEach(comet => rewardOwedCalls.push({ target: COMET_REWARD, params: [comet.address, vault] })));

  const [collateralInfos, balanceOfs, borrowBalanceOfs, rewardOwed] = await Promise.all([
    api.multiCall({ abi: abi.getAssetInfo, calls: collateralCalls }),
    api.multiCall({ abi: 'erc20:balanceOf', calls: balanceOfCalls }),
    api.multiCall({ abi: abi.borrowBalanceOf, calls: balanceOfCalls }),
    api.multiCall({ abi: abi.getRewardOwed, calls: rewardOwedCalls })
  ]);

  balanceOfs.forEach((balance, i) => {
    const sum = (BigInt(balance) - BigInt(borrowBalanceOfs[i])).toString();
    api.addToken(balanceOfCalls[i].baseToken, sum);
  });

  rewardOwed.forEach(reward => {
    api.addToken(reward.token, reward.owed);
  });

  const collateralBalanceOfCalls = [];
  vaults.forEach(vault => collateralInfos.forEach((collateral, i) => collateralBalanceOfCalls.push({ target: collateralCalls[i].target, params: [vault, collateral.asset] })));
  const collateralBalanceOfs = await api.multiCall({ abi: abi.collateralBalanceOf, calls: collateralBalanceOfCalls });

  collateralBalanceOfs.forEach((balance, i) => {
    api.addToken(collateralBalanceOfCalls[i].params[1], balance);
  });
}

async function processAaveTvl(aaveVaults, api, AAVE_POOL, AAVE_POOL_DATA_PROVIDER) {
  if (aaveVaults.length === 0 || !AAVE_POOL || !AAVE_POOL_DATA_PROVIDER) return

  const aaveReservesList = await api.call({ abi: abi.getReservesList, target: AAVE_POOL });

  const aaveReserveDetails = await api.multiCall({ abi: abi.getReserveData, target: AAVE_POOL, calls: aaveReservesList });

  const aaveQueryParams = [];
  aaveReservesList.forEach(asset => aaveVaults.forEach(vault => aaveQueryParams.push({ params: [asset, vault], })));
  const aavePositions = await api.multiCall({ abi: abi.getUserReserveData, target: AAVE_POOL_DATA_PROVIDER, calls: aaveQueryParams });

  for (const i in aavePositions) {
    const aavePosition = aavePositions[i];
    const reserveIdx = aaveReservesList.findIndex(x => x === aaveQueryParams[i].params[0]);

    api.addToken(aaveReserveDetails[reserveIdx].aTokenAddress, aavePosition.currentATokenBalance);
    api.addToken(aaveReserveDetails[reserveIdx].stableDebtTokenAddress, aavePosition.currentStableDebt);
    api.addToken(aaveReserveDetails[reserveIdx].variableDebtTokenAddress, aavePosition.currentVariableDebt);
  }

}

async function processSymbioticTvl(symbioticVaults, api) {
  if (symbioticVaults.length === 0) return

  const collaterals = await api.multiCall({ abi: abi.collateral, calls: symbioticVaults.map(x => ({target: x[1]}))})

  const balances = await api.multiCall({ abi: 'erc20:balanceOf', calls: symbioticVaults.map(x => ({target: x[1], params: [x[0]]}))})

  collaterals.forEach((collateral, i) => {
    api.addToken(collateral, balances[i])
  })
}

async function processMorphoBlueTvl(morphoBlueVaults, api, MORPHO_BLUE) {
  if (morphoBlueVaults.length === 0) return;

  // Get the number of markets for each oracle
  const marketLengths = await api.multiCall({
    abi: abi.getMarketsLength,
    calls: morphoBlueVaults.map(x => ({target: x[1], params: []}))
  });


  // Build calls to get each market by index
  const marketCalls = [];
  morphoBlueVaults.forEach(([vault, oracle], oracleIndex) => {
    const length = marketLengths[oracleIndex];
    for (let i = 0; i < length; i++) {
      marketCalls.push({
        target: oracle,
        params: [i],
        vault: vault,
        oracleIndex: oracleIndex
      });
    }
  });

  if (marketCalls.length === 0) return;

  // Get all markets from the Morpho Blue position oracles
  const markets = await api.multiCall({ abi: abi.markets, calls: marketCalls });

  const [marketInfos, marketParams] = await Promise.all(
    [
      api.multiCall({
        abi: abi.market,
        calls: markets.map(market => ({target: MORPHO_BLUE, params: [market[0]]}))
      }),
      api.multiCall({
        abi: abi.idToMarketParams,
        calls: markets.map(market => ({ target: MORPHO_BLUE, params: [market[0]] }))
      })
    ]
  );

  // Get positions for each vault across all markets
  const positionCalls = [];
  marketCalls.forEach((call, index) => {
    const marketId = markets[index][0]; // Extract the market ID (bytes32)
    positionCalls.push({
      target: MORPHO_BLUE,
      params: [marketId, call.vault]
    });
  });

  const positions = await api.multiCall({
    abi: abi.position,
    calls: positionCalls
  });

  // Process positions and add to TVL
  await Promise.all(positionCalls.map(async (call, index) => {
    const [_, vault] = call.params;
    const position = positions[index];
    const marketParam = marketParams[index];
    const marketInfo = marketInfos[index];

    if (position.collateral > 0) {
      if (MORPHO_ERC4626_ASSETS.includes(marketParam.collateralToken.toLowerCase())) {
        // If the collateral token is an ERC4626, we need to convert it to the underlying asset
        const [underlyingAsset, collateralAssets] = await Promise.all([
          api.call({ abi: 'address:asset', target: marketParam.collateralToken }),
          api.call({ abi: abi.convertToAssets, target: marketParam.collateralToken, params: [position.collateral] })
        ]);
        api.addToken(underlyingAsset, collateralAssets, vault);
      } else {
        api.addToken(marketParam.collateralToken, position.collateral, vault);
      }
    }

    if (position.supplyShares > 0) {
      const supplyAssets = (
        BigInt(position.supplyShares) *
        BigInt(marketInfo.totalSupplyAssets) / BigInt(marketInfo.totalSupplyShares)
      );
      api.addToken(marketParam.loanToken, supplyAssets, vault);
    }
    if (position.borrowShares > 0) {
      const borrowAssets = (
        BigInt(position.borrowShares) *
        BigInt(marketInfo.totalBorrowAssets) / BigInt(marketInfo.totalBorrowShares)
      );
      api.addToken(marketParam.loanToken, -borrowAssets, vault);
    }
  }));
}

const abi = {
  "collateralBalanceOf": "function collateralBalanceOf(address account, address asset) view returns (uint128)",
  "getReserveData": "function getReserveData(address asset) view returns (((uint256 data) configuration, uint128 liquidityIndex, uint128 currentLiquidityRate, uint128 variableBorrowIndex, uint128 currentVariableBorrowRate, uint128 currentStableBorrowRate, uint40 lastUpdateTimestamp, uint16 id, address aTokenAddress, address stableDebtTokenAddress, address variableDebtTokenAddress, address interestRateStrategyAddress, uint128 accruedToTreasury, uint128 unbacked, uint128 isolationModeTotalDebt))",
  "assets": "function assets() view returns ((address asset, uint256 heartbeat, bool isERC4626, address oracle)[])",
  "convertToAssets": "function convertToAssets(uint256 shares) view returns (uint256 assets)",
  "getUserReserveData": "function getUserReserveData(address asset, address user) view returns (uint256 currentATokenBalance, uint256 currentStableDebt, uint256 currentVariableDebt, uint256 principalStableDebt, uint256 scaledVariableDebt, uint256 stableBorrowRate, uint256 liquidityRate, uint40 stableRateLastUpdated, bool usageAsCollateralEnabled)",
  "getReservesList": "address[]:getReservesList",
  "getAssetInfo": "function getAssetInfo(uint8 i) view returns ((uint8 offset, address asset, address priceFeed, uint64 scale, uint64 borrowCollateralFactor, uint64 liquidateCollateralFactor, uint64 liquidationFactor, uint128 supplyCap))",
  "borrowBalanceOf": "function borrowBalanceOf(address account) view returns (uint256)",
  "getRewardOwed": "function getRewardOwed(address comet, address account) returns ((address token, uint256 owed))",
  "llamaPayCount": "function llamaPayCount() returns (uint256 count)",
  "llamaPayInfoList": "function llamaPayInfoList() returns ((address llamapay, address priceFeed, bool invertPrice)[])",
  "token": "function token() returns (address token)",
  "balances": "function balances(address) returns (uint256)",
  "DECIMALS_DIVISOR": "function DECIMALS_DIVISOR() returns (uint256)",
  "stakingToken": "function stakingToken() returns (address)",
  "rewardsToken": "function rewardsToken() returns (address)",
  "farmed": "function farmed(address) returns (uint256)",
  "totalUnderlying": "function totalUnderlying(address) returns (uint256 totalAmount0, uint256 totalAmount1)",
  "token0": "function token0() returns (address)",
  "token1": "function token1() returns (address)",
  "stakerStrategyShares": "function stakerStrategyShares(address,address) returns (uint256)",
  "strategy": "function stakerStrategyShares() returns (address)",
  "underlyingToken": "function underlyingToken() returns (address)",
  "sharesToUnderlyingView": "function sharesToUnderlyingView(uint256) returns (uint256)",
  "queuedWithdrawals": "function queuedWithdrawals(uint256) returns (bytes32 root, uint256 shares)",
  "getPoolIndicesOfUser": "function getPoolIndicesOfUser(address user) returns (address[])",
  "esXaiStakeBucket": "function esXaiStakeBucket() returns (address)",
  "getStakedAmounts": "function getStakedAmounts(address) returns (uint256)",
  "withdrawableDividendOf": "function withdrawableDividendOf(address) returns (uint256)",
  "collateral": "function collateral() returns (address)",
  "getMarketsLength": "function getMarketsLength() view returns (uint256)",
  "markets": "function markets(uint256) view returns ((bytes32, address, uint80, uint8, bool))",
  "idToMarketParams": "function idToMarketParams(bytes32) view returns (address loanToken, address collateralToken, address oracle, address irm, uint256 lltv)",
  "position": "function position(bytes32, address) view returns (uint256 supplyShares, uint256 borrowShares, uint256 collateral)",
  "market": "function market(bytes32) view returns (uint128 totalSupplyAssets, uint128 totalSupplyShares, uint128 totalBorrowAssets, uint128 totalBorrowShares)"
}