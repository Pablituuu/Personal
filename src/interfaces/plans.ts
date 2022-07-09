export interface listPlans {
  plans: [
    {
      id: string
      amount: number
      active: boolean
      currency: string
      type: string
      product_id: string
      product_name: string
    }
  ]
}
