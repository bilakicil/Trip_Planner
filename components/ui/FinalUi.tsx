"use client";

import { FinalResponse } from "@/lib/types/FinalResponse";

export default function FinalUi({ data }: { data: FinalResponse }) {
  console.log("FinalUi received data:", data);
  console.log("FinalUi data type:", typeof data);
  console.log("FinalUi itinerary data:", data?.itinerary);
  console.log("FinalUi itinerary length:", data?.itinerary?.length);
  console.log("FinalUi estimasi data:", data?.estimasi);
  console.log("FinalUi estimasi length:", data?.estimasi?.length);

  if (!data) {
    console.log("FinalUi: No data provided");
    return <div className="text-red-500">No data provided to FinalUi</div>;
  }

  return (
    <div className="bg-white border p-3 sm:p-4 md:p-6 rounded-xl w-full max-w-sm sm:max-w-lg md:max-w-2xl lg:max-w-3xl shadow-md space-y-4 sm:space-y-5 md:space-y-6">
      {/* Overview */}
      <div>
        <h2 className="text-lg sm:text-xl font-bold mb-2">
          Ringkasan Perjalanan
        </h2>
        <p className="text-sm sm:text-base text-gray-700 whitespace-pre-wrap">
          {data.resp}
        </p>
      </div>

      {/* Itinerary */}
      <div>
        <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Itinerary</h2>

        {data.itinerary && data.itinerary.length > 0 ? (
          data.itinerary.map((day, idx) => (
            <div key={idx} className="mb-3 sm:mb-4">
              <h3 className="font-semibold text-blue-600 text-sm sm:text-base">
                {day.day}
              </h3>
              <ul className="list-disc ml-4 sm:ml-6 text-gray-700 text-sm sm:text-base">
                {day.activities.map((act, i) => (
                  <li key={i} className="mb-1">
                    {act}
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <p className="text-gray-500">Tidak ada data itinerary tersedia.</p>
        )}
      </div>

      {/* Estimasi Biaya */}
      <div>
        <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">
          Estimasi Biaya
        </h2>
        {data.estimasi && data.estimasi.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-xs sm:text-sm border min-w-[500px] sm:min-w-0">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-1 sm:p-2 border text-xs sm:text-sm">
                    Kategori
                  </th>
                  <th className="p-1 sm:p-2 border text-xs sm:text-sm">
                    Rincian
                  </th>
                  <th className="p-1 sm:p-2 border text-xs sm:text-sm">
                    Per Orang
                  </th>
                  <th className="p-1 sm:p-2 border text-xs sm:text-sm">
                    Rombongan
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.estimasi.map((cost, i) => (
                  <tr key={i}>
                    <td className="p-1 sm:p-2 border text-xs sm:text-sm">
                      {cost.kategori}
                    </td>
                    <td className="p-1 sm:p-2 border text-xs sm:text-sm">
                      {cost.rincian}
                    </td>
                    <td className="p-1 sm:p-2 border text-xs sm:text-sm">
                      {cost.estimasi_per_orang}
                    </td>
                    <td className="p-1 sm:p-2 border text-xs sm:text-sm">
                      {cost.total_rombongan}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500">
            Tidak ada data estimasi biaya tersedia.
          </p>
        )}
      </div>

      {/* Admin Info */}
      {data.admin && (
        <div>
          <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">
            Informasi Administratif
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4">
            <div>
              <p className="text-sm sm:text-base">
                <strong>Status Visa:</strong> {data.admin.visa}
              </p>
              {data.admin.biayaVisa && (
                <p className="text-sm sm:text-base">
                  <strong>Biaya Visa:</strong> {data.admin.biayaVisa}
                </p>
              )}
              {data.admin.prosesVisa && (
                <p className="text-sm sm:text-base">
                  <strong>Proses Visa:</strong> {data.admin.prosesVisa}
                </p>
              )}
            </div>

            {data.admin.biayaDokumen && (
              <div>
                <h4 className="font-semibold text-sm sm:text-base">
                  Biaya Dokumen:
                </h4>
                {data.admin.biayaDokumen.paspor && (
                  <p className="text-sm sm:text-base">
                    <strong>Paspor:</strong> {data.admin.biayaDokumen.paspor}
                  </p>
                )}
                {data.admin.biayaDokumen.asuransi && (
                  <p className="text-sm sm:text-base">
                    <strong>Asuransi:</strong>{" "}
                    {data.admin.biayaDokumen.asuransi}
                  </p>
                )}
                {data.admin.biayaDokumen.simInternasional && (
                  <p className="text-sm sm:text-base">
                    <strong>SIM Internasional:</strong>{" "}
                    {data.admin.biayaDokumen.simInternasional}
                  </p>
                )}
              </div>
            )}
          </div>

          <h3 className="font-semibold mt-3 sm:mt-4 mb-2 text-sm sm:text-base">
            Dokumen yang Diperlukan:
          </h3>
          <ul className="list-disc ml-4 sm:ml-6 mb-3 sm:mb-4 text-sm sm:text-base">
            {data.admin.dokumen.map((doc, i) => (
              <li key={i} className="mb-1">
                {doc}
              </li>
            ))}
          </ul>

          <h3 className="font-semibold mt-3 sm:mt-4 mb-2 text-sm sm:text-base">
            Tips Praktis:
          </h3>
          <ul className="list-disc ml-4 sm:ml-6 mb-3 sm:mb-4 text-sm sm:text-base">
            {data.admin.tips.map((tip, i) => (
              <li key={i} className="mb-1">
                {tip}
              </li>
            ))}
          </ul>

          {data.admin.kantorVisa && (
            <div>
              <h3 className="font-semibold mt-3 sm:mt-4 mb-2 text-sm sm:text-base">
                Kantor Visa/Kedutaan:
              </h3>
              <p className="text-gray-700 text-sm sm:text-base">
                {data.admin.kantorVisa}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
