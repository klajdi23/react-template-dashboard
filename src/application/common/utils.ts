export const moneyFormatter = (amount?: number | null): string => {

    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
     });
     if(!amount) return  formatter.format(0);

    return  formatter.format(Number(amount)??0);
}

export const onFocusMoneyType = (value:any) : any  => {
  return value ?  Number(String(value).replace(/[^0-9.-]+/g,"")) : ''
}

export const onBlurMoneyType = (value:any) => {
  const options = {
    maximumFractionDigits : 2,
    currency              : "USD",
    style                 : "currency",
    currencyDisplay       : "symbol"
}

const result =   (value || value === 0)
  ? Number(String(value).replace(/[^0-9.-]+/g,"")) .toLocaleString(undefined, options)
  : '';
  return result;
}

export const fileToBase64 = (file: File): Promise<string | ArrayBuffer | null> =>
  new Promise<string | ArrayBuffer | null>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export  const newGuid = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
}

type GetPropertyValueFn = {
  <T, K1 extends keyof T>(object: T, key1: K1): T[K1] | undefined;
  <T, K1 extends keyof T, K2 extends keyof T[K1]>(object: T, key1: K1, key2: K2): T[K1][K2] | undefined;
  <T, K1 extends keyof T, K2 extends keyof T[K1], K3 extends keyof T[K1][K2]>(object: T, key1: K1, key2: K2, key3: K3): T[K1][K2][K3] | undefined;
  <T, K1 extends keyof T, K2 extends keyof T[K1], K3 extends keyof T[K1][K2], K4 extends keyof T[K1][K2][K3]>(object: T, key1: K1, key2: K2, key3: K3, key4: K4): T[K1][K2][K3][K4] | undefined;
  <T, K1 extends keyof T, K2 extends keyof T[K1], K3 extends keyof T[K1][K2], K4 extends keyof T[K1][K2][K3], K5 extends keyof T[K1][K2][K3][K4]>(object: T, key1: K1, key2: K2, key3: K3, key4: K4, key5: K5): T[K1][K2][K3][K4][K5] | undefined;
  <T, K1 extends keyof T, K2 extends keyof T[K1], K3 extends keyof T[K1][K2], K4 extends keyof T[K1][K2][K3], K5 extends keyof T[K1][K2][K3][K4], K6 extends keyof T[K1][K2][K3][K4][K5]>(object: T, key1: K1, key2: K2, key3: K3, key4: K4, key5: K5, key6: K6): T[K1][K2][K3][K4][K5][K6] | undefined;
  <T>(object: T, properties: string[]): any;
}

/**
 * @param object object to access the value from
 * @param properties chained properties (`'property1', 'property2', 'etc'`) or array of property names (`[ 'property1', 'property2', 'etc' ]`)
 * @returns value of the object's property
 * @example
 * const testObject = {
 *   id: '1',
 *   nested: {
 *     name: 'Test'
 *   }
 * };
 * console.log(getPropertyValue(testObject, 'nested', 'name')); // Output: 'Test'
 * console.log(getPropertyValue(testObject, [ 'nested', 'name' ])); // This works too. Output: 'Test'
 */

export const getPropertyValue: GetPropertyValueFn = <T>(object: T, ...properties: string[] | string[][]): any => object && properties && properties.length && ((Array.isArray(properties[0]) ? properties[0] : properties) as Array<string>).reduce((acc: any, cur: any) => acc?.[cur], object);

export const getPropertyValueBySeparator = (object: any, property: string, separator = '.'): any => getPropertyValue(object, property?.split(separator));
