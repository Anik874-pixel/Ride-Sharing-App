import PaymentMethods from '@/components/payment/PaymentMethods'
import AddPaymentMethod from '@/components/payment/AddPaymentMethod'
import PaymentHistory from '@/components/payment/PaymentHistory'

export default function PaymentPage() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">Payment Methods</h1>
      <div className="grid gap-6">
        <PaymentMethods />
        <AddPaymentMethod />
        <PaymentHistory />
      </div>
    </div>
  )
}