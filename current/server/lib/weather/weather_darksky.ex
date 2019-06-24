defmodule Weather.Darksky do
  use HTTPoison.Base

  def getWeather(latitude, longitude) do
    #
    url = "https://api.darksky.net/forecast/#{key}/#{latitude},#{longitude}?exclude=[minutely]"

    case HTTPoison.get(url) do
      {:ok, %HTTPoison.Response{body: body, status_code: 200}} ->
        IO.puts(body)
        body

      {:ok, %HTTPoison.Response{status_code: 404}} ->
        IO.puts("Not Found :(")

      {:error, %HTTPoison.Error{reason: reason}} ->
        IO.inspect(reason)
    end
  end
end
