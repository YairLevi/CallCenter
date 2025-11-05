export function tryGetErrorMessage(res: any) {
  if (res == undefined)
    return ''
  return res?.response?.data?.message ?? 'Failed to perform operation'
}
